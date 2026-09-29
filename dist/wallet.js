import { createPublicClient, http, isAddress } from "viem";
import { GENERATION_SPRITE_MANIFEST } from "./generation-sprites.js";
/** SDK defaults are public read-only infrastructure; no account, signer or API key is needed. */
export function createFriendPublicClient(options = {}) {
    return createPublicClient({ transport: http(options.rpcUrl ?? GENERATION_SPRITE_MANIFEST.rpcUrl, { batch: options.batch ? { wait: 50, batchSize: 50 } : false }), cacheTime: 0, pollingInterval: 1_000 });
}
function isProvider(value) {
    if (!value || typeof value !== "object")
        return false;
    const provider = value;
    return typeof provider.request === "function" && typeof provider.on === "function" && typeof provider.removeListener === "function";
}
function readAccount(value) {
    if (!Array.isArray(value) || value.some(account => typeof account !== "string" || !isAddress(account))) {
        throw new Error("The wallet returned an invalid account list.");
    }
    return value[0] ?? null;
}
function readChainId(value) {
    if (typeof value !== "string" || !/^0x[0-9a-f]+$/i.test(value))
        throw new Error("The wallet returned an invalid network.");
    const chainId = Number(BigInt(value));
    if (!Number.isSafeInteger(chainId) || chainId < 1)
        throw new Error("The wallet returned an invalid network.");
    return chainId;
}
function connectionError(error) {
    if (error && typeof error === "object" && "code" in error && error.code === 4001)
        return "Wallet connection was declined. Try again when ready.";
    return error instanceof Error ? error.message : "Could not read the wallet connection. Try again.";
}
/**
 * Trusted local connection lifecycle, independent of any website or game.
 * Discovery/restoration never prompts. Call connect() from the player's button.
 * Account/network/provider changes synchronously clear identity before re-reading it.
 * This session proves no NFT ownership: use readGenerationEligibility before play.
 */
export function createFriendWalletSession(options = {}) {
    const target = options.target ?? (typeof window === "undefined" ? undefined : window);
    const choices = new Map();
    const listeners = new Set();
    let selected = null;
    let removeProviderListeners = () => { };
    let disposed = false;
    let restoreDiscoveredWallet = true;
    let operation = 0;
    let state = Object.freeze({ status: "unavailable", wallets: Object.freeze([]),
        selectedWalletId: null, account: null, chainId: null, revision: 0, error: null });
    function publish(change) {
        state = Object.freeze({ ...state, ...change });
        for (const listener of listeners)
            listener();
    }
    function invalidate(status, error = null) {
        operation++;
        publish({ status, account: null, chainId: null, error, revision: state.revision + 1 });
        return operation;
    }
    async function readConnection(prompt) {
        if (disposed)
            return state;
        if (!selected) {
            invalidate(choices.size ? "disconnected" : "unavailable");
            return state;
        }
        const { provider } = selected;
        const ticket = invalidate("connecting");
        try {
            const accounts = await provider.request({ method: prompt ? "eth_requestAccounts" : "eth_accounts" });
            if (disposed || ticket !== operation)
                return state;
            const account = readAccount(accounts);
            const chainId = readChainId(await provider.request({ method: "eth_chainId" }));
            if (disposed || ticket !== operation)
                return state;
            publish({ account, chainId, status: account === null ? "disconnected"
                    : chainId === GENERATION_SPRITE_MANIFEST.chainId ? "connected" : "wrong-network" });
        }
        catch (error) {
            if (!disposed && ticket === operation)
                publish({ status: "error", account: null, chainId: null, error: connectionError(error) });
        }
        return state;
    }
    function select(id) {
        const wallet = choices.get(id);
        if (!wallet || disposed)
            return false;
        removeProviderListeners();
        selected = { id, provider: wallet.provider };
        invalidate("connecting");
        const refresh = () => { if (selected?.provider === wallet.provider)
            void readConnection(false); };
        const disconnected = () => { if (!disposed && selected?.provider === wallet.provider)
            invalidate("disconnected"); };
        const registrations = [["accountsChanged", refresh], ["chainChanged", refresh], ["connect", refresh], ["disconnect", disconnected]];
        // EIP-1193 events belong to the selected provider only. Old provider events
        // cannot restore a session after another wallet has been selected.
        for (const [event, listener] of registrations)
            wallet.provider.on(event, listener);
        removeProviderListeners = () => {
            for (const [event, listener] of registrations)
                wallet.provider.removeListener(event, listener);
        };
        publish({ selectedWalletId: id });
        return true;
    }
    function addWallet(id, name, provider) {
        if (disposed || choices.has(id))
            return;
        const duplicate = [...choices.entries()].find(([, entry]) => entry.provider === provider);
        if (duplicate) {
            // EIP-6963 supplies the real name for a provider first seen as window.ethereum.
            if (duplicate[0] !== "injected")
                return;
            choices.delete(duplicate[0]);
            if (selected?.id === duplicate[0])
                selected.id = id;
        }
        choices.set(id, { choice: Object.freeze({ id, name }), provider });
        publish({ wallets: Object.freeze([...choices.values()].map(entry => entry.choice)),
            selectedWalletId: selected?.id ?? null, status: state.status === "unavailable" ? "disconnected" : state.status });
        if (!selected && restoreDiscoveredWallet) {
            select(id);
            void readConnection(false);
        }
    }
    const announce = (event) => {
        const detail = event.detail;
        if (!detail || typeof detail !== "object")
            return;
        const { info, provider } = detail;
        if (!info || typeof info !== "object" || !isProvider(provider))
            return;
        if (typeof info.uuid !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(info.uuid))
            return;
        if (typeof info.name !== "string" || !info.name.trim())
            return;
        addWallet(info.uuid, info.name.trim().slice(0, 100), provider);
    };
    const discover = () => {
        if (disposed || options.provider)
            return;
        if (target && isProvider(target.ethereum))
            addWallet("injected", "Browser wallet", target.ethereum);
        target?.dispatchEvent(new Event("eip6963:requestProvider"));
    };
    if (options.provider) {
        if (!isProvider(options.provider))
            throw new TypeError("The wallet provider must support EIP-1193 requests and connection events.");
        addWallet("supplied", "Connected wallet", options.provider);
    }
    else {
        target?.addEventListener("eip6963:announceProvider", announce);
        discover();
    }
    return Object.freeze({
        getSnapshot: () => state,
        /** Trusted runtime only; live actions still require explicit player confirmation. */
        getProvider: () => disposed ? null : selected?.provider ?? null,
        subscribe(listener) {
            if (!disposed)
                listeners.add(listener);
            return () => { listeners.delete(listener); };
        },
        /** Only invoke from a user gesture. Connecting does not sign or spend. */
        async connect(walletId) {
            if (disposed)
                return state;
            discover();
            const id = walletId ?? selected?.id ?? choices.keys().next().value;
            if (!id) {
                invalidate("unavailable", "No browser wallet was found. Open this component in a wallet-enabled browser.");
                return state;
            }
            if (!select(id)) {
                invalidate("error", "That wallet is no longer available. Choose another wallet.");
                return state;
            }
            return readConnection(true);
        },
        refresh: () => readConnection(false),
        /** Only invoke from a user gesture. This requests a network change, never a transaction. */
        async switchNetwork() {
            if (disposed || !selected || state.status === "switching-network")
                return state;
            const { provider } = selected;
            const ticket = invalidate("switching-network");
            const active = () => !disposed && ticket === operation && selected?.provider === provider;
            const chainId = `0x${GENERATION_SPRITE_MANIFEST.chainId.toString(16)}`;
            try {
                try {
                    await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId }] });
                }
                catch (error) {
                    if (!active())
                        return state;
                    if (!error || typeof error !== "object" || !("code" in error) || error.code !== 4902)
                        throw error;
                    // Official network settings: https://docs.robinhood.com/chain/connecting/
                    await provider.request({ method: "wallet_addEthereumChain", params: [{ chainId,
                                chainName: "Robinhood Chain", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                                rpcUrls: [GENERATION_SPRITE_MANIFEST.rpcUrl], blockExplorerUrls: ["https://robinhoodchain.blockscout.com"],
                            }] });
                    if (!active())
                        return state;
                    // Adding a network does not guarantee the wallet selected it.
                    await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId }] });
                }
                // chainChanged may already have started a fresh read and invalidated this operation.
                if (active())
                    await readConnection(false);
            }
            catch (error) {
                if (!active())
                    return state;
                const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
                const message = code === 4001 ? "Network switch declined. Try again when ready."
                    : code === -32002 ? "A wallet request is already pending. Open your wallet to finish it."
                        : "Could not switch networks. Try again, or select Robinhood mainnet (4663) in your wallet and check the network.";
                await readConnection(false);
                if (!disposed && operation === ticket + 1 && selected?.provider === provider)
                    publish({ error: message });
            }
            return state;
        },
        /** Forget this local session. Does not revoke permissions or modify the wallet. */
        disconnect() {
            if (disposed)
                return;
            removeProviderListeners();
            selected = null;
            restoreDiscoveredWallet = false;
            invalidate(choices.size ? "disconnected" : "unavailable");
            publish({ selectedWalletId: null });
        },
        dispose() {
            if (disposed)
                return;
            disposed = true;
            removeProviderListeners();
            target?.removeEventListener("eip6963:announceProvider", announce);
            listeners.clear();
            selected = null;
            choices.clear();
            invalidate("unavailable");
            state = Object.freeze({ ...state, wallets: Object.freeze([]), selectedWalletId: null });
        },
    });
}
