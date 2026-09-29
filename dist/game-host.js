"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createWalletClient, custom, defineChain, formatEther, isAddress, parseAbi, parseUnits, zeroAddress } from "viem";
import { GENERATION_SPRITE_MANIFEST } from "./generation-sprites.js";
const WALLET_ABI = parseAbi(["function tokenBoundAccount(uint256 tokenId) view returns (address)"]);
import { bindGameFrame } from "./frame-bridge.js";
import { GameFrame } from "./game-frame.js";
import { createGamePreview, maximumPrize, RF } from "./game.js";
import { createLiveGameClient, LIVE_GAME_MAX_ORACLE_FEE } from "./live-game.js";
import { fundFriendWallet } from "./friend-funding.js";
import { readGenerationEligibility } from "./identity.js";
import { readOwnedFriends } from "./owned-friends.js";
import { createFriendWalletSession, createFriendPublicClient } from "./wallet.js";
/** Complete game runtime: connection, owned Friends, verification, frame and confirmations. */
export function GameHost({ walletProvider, publicClient, ...props }) {
    const [connection, setConnection] = useState(null);
    const [defaultClient] = useState(() => createFriendPublicClient({ batch: Boolean(props.deployment) }));
    useEffect(() => {
        const session = createFriendWalletSession({ provider: walletProvider });
        setConnection({ provider: walletProvider, session });
        return () => session.dispose();
    }, [walletProvider]);
    if (!connection || connection.provider !== walletProvider)
        return _jsx(GameFrame, { mode: props.deployment ? "live" : "preview", friends: [], selectedFriendId: null, friendsLoading: true, children: _jsx("p", { className: "rf-runtime-status", role: "status", children: "Loading wallet connection\u2026" }) });
    return _jsx(WalletViewport, { ...props, session: connection.session, publicClient: publicClient ?? defaultClient });
}
function WalletViewport({ session, publicClient, ...props }) {
    const wallet = useSyncExternalStore(session.subscribe, session.getSnapshot, session.getSnapshot);
    const provider = session.getProvider();
    const walletClient = useMemo(() => provider && wallet.account && props.deployment ? createWalletClient({
        account: wallet.account, chain: defineChain({ id: props.deployment.chainId, name: "Robinhood",
            nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
            rpcUrls: { default: { http: [GENERATION_SPRITE_MANIFEST.rpcUrl] } } }),
        transport: custom(provider),
    }) : undefined, [provider, wallet.account, wallet.revision, props.deployment]);
    const assertWalletActive = useCallback(() => {
        const current = session.getSnapshot();
        if (current.revision !== wallet.revision || current.status !== "connected" || session.getProvider() !== provider) {
            throw new Error("Wallet session changed. Reconnect before continuing.");
        }
    }, [session, wallet.revision, provider]);
    const [attempt, setAttempt] = useState(0);
    const [selected, setSelected] = useState(null);
    const [discovery, setDiscovery] = useState(null);
    const valid = wallet.status === "connected" && discovery?.revision === wallet.revision &&
        discovery.client === publicClient && discovery.session === session && discovery.attempt === attempt ? discovery : null;
    const friends = valid?.friends ?? [];
    const friend = friends.find(value => value.id === selected) ?? null;
    useEffect(() => {
        setSelected(null);
        if (wallet.status !== "connected" || !wallet.account)
            return;
        const controller = new AbortController();
        void readOwnedFriends(publicClient, wallet.account, { signal: controller.signal }).then(result => {
            if (!controller.signal.aborted)
                setDiscovery({ client: publicClient, session, revision: wallet.revision, attempt, friends: result.friends, hiddenCount: result.hiddenCount });
        }).catch(error => {
            if (!controller.signal.aborted)
                setDiscovery({ client: publicClient, session, revision: wallet.revision, attempt, friends: [],
                    error: error instanceof Error ? error.message : "Could not load your Friends. Try again." });
        });
        return () => controller.abort();
    }, [session, publicClient, wallet.status, wallet.account, wallet.revision, attempt]);
    const connection = _jsxs("div", { className: "rf-runtime-connection", children: [wallet.status === "unavailable" && _jsxs(_Fragment, { children: [_jsx("p", { children: "No browser wallet found. Enable your wallet extension or open this game in your wallet\u2019s browser." }), _jsx("button", { type: "button", onClick: () => { void session.connect(); }, children: "Check for wallet" })] }), wallet.status === "disconnected" && _jsx("p", { children: "Connect your wallet to find your Friends on Robinhood." }), wallet.status === "connecting" && _jsx("p", { role: "status", children: "Connecting wallet\u2026" }), wallet.status === "switching-network" && _jsx("button", { type: "button", disabled: true, children: "Switching network\u2026 Check your wallet" }), wallet.status === "wrong-network" && _jsxs("p", { role: "alert", children: ["Your wallet is on ", wallet.chainId === 1 ? "Ethereum mainnet" : `chain ${wallet.chainId}`, ". Switch to Robinhood mainnet (4663) to load your Friends."] }), wallet.error && _jsx("p", { role: "alert", children: wallet.error }), wallet.account && _jsxs("p", { children: ["Connected: ", wallet.account] }), (wallet.status === "disconnected" || wallet.status === "error") && wallet.wallets.map(value => _jsx("button", { type: "button", onClick: () => { void session.connect(value.id); }, children: wallet.wallets.length === 1 ? "Connect wallet" : `Connect ${value.name}` }, value.id)), wallet.account && _jsx("button", { type: "button", onClick: () => session.disconnect(), children: "Disconnect" }), wallet.status === "connected" && _jsx("button", { type: "button", onClick: () => setAttempt(value => value + 1), children: valid?.error ? "Retry loading Friends" : "Refresh Friends" }), wallet.status === "wrong-network" && _jsxs(_Fragment, { children: [_jsx("button", { type: "button", className: "rf-frame-primary", onClick: () => { void session.switchNetwork(); }, children: "Switch to Robinhood" }), _jsx("button", { type: "button", onClick: () => { void session.refresh(); }, children: "Check network" })] })] });
    return _jsx(ConnectedViewport, { ...props, selectedFriend: friend, account: wallet.account, chainId: wallet.chainId, publicClient: publicClient, revision: wallet.revision, walletClient: walletClient, assertActive: assertWalletActive, picker: { friends, onSelectFriend: setSelected, connection,
            friendsLoading: wallet.status === "connected" && !valid, friendsError: valid?.error,
            friendsHiddenCount: valid?.hiddenCount,
            friendsEmptyMessage: valid && !valid.error ? valid.hiddenCount ? "No eligible Friends available in this wallet." : "No Rare Friends Generations NFTs found in this wallet on Robinhood." : null } });
}
/** SDK frame for a project that already supplies connection and selection. */
export function ConnectedGameHost(props) { return _jsx(ConnectedViewport, { ...props }); }
function ConnectedViewport({ definition, selectedFriend, account, chainId, publicClient, frameUrl, revision = 0, picker, deployment, walletClient, assertActive }) {
    const ledgerState = useRef({ definition, revision: 0, ledgers: new Map() });
    if (ledgerState.current.definition !== definition)
        ledgerState.current = { definition, revision: ledgerState.current.revision + 1, ledgers: new Map() };
    const ledgers = ledgerState.current.ledgers;
    const key = JSON.stringify([selectedFriend?.id.toString(), selectedFriend?.walletAddress?.toLowerCase(), account?.toLowerCase(), chainId]);
    const sessionKey = `${key}:${revision}:${ledgerState.current.revision}:${deployment?.game ?? "preview"}`;
    if (!selectedFriend || !account || chainId === null || !publicClient)
        return _jsx(GameFrame, { mode: deployment ? "live" : "preview", selectionMode: picker ? "picker" : "host", friends: selectedFriend ? [selectedFriend] : [], selectedFriendId: selectedFriend?.id ?? null, ...picker, children: _jsx("p", { className: "rf-runtime-status", role: "status", children: "Connect a wallet and choose an owned hardwired Friend." }) });
    return _jsx(EligibilityGate, { definition: definition, picker: picker, friend: selectedFriend, account: account, chainId: chainId, publicClient: publicClient, frameUrl: frameUrl, ledgers: ledgers, deployment: deployment, walletClient: walletClient, assertActive: assertActive }, sessionKey);
}
function EligibilityGate({ definition, picker, friend, account, chainId, publicClient, frameUrl, ledgers, deployment, walletClient, assertActive }) {
    const [attempt, setAttempt] = useState(0);
    const [verification, setVerification] = useState(null);
    useEffect(() => {
        let alive = true;
        setVerification(null);
        if (chainId !== 4663) {
            setVerification({ client: publicClient, eligible: false, error: "Switch your wallet to Robinhood mainnet (4663)." });
            return () => { alive = false; };
        }
        void readGenerationEligibility(publicClient, friend.id, account).then(async (result) => {
            let walletAddress;
            if (result.eligible) {
                walletAddress = await publicClient.readContract({ address: GENERATION_SPRITE_MANIFEST.generations, abi: WALLET_ABI,
                    functionName: "tokenBoundAccount", args: [friend.id], blockNumber: result.blockNumber });
                if (!isAddress(walletAddress) || walletAddress.toLowerCase() === zeroAddress)
                    throw new Error("Invalid canonical Friend wallet.");
            }
            if (alive)
                setVerification({ client: publicClient, eligible: result.eligible === true, walletAddress,
                    error: result.eligible ? undefined : "The connected account must own this hardwired Generations Friend (generation 1 or higher)." });
        }).catch(cause => {
            if (alive)
                setVerification({ client: publicClient, eligible: false,
                    error: `Could not verify this Friend. ${cause instanceof Error ? cause.message : "Try again."}` });
        });
        return () => { alive = false; };
    }, [publicClient, friend.id, account, chainId, attempt]);
    // A replaced read client invalidates verification during render, before effects.
    const checked = verification?.client === publicClient ? verification : null;
    if (!checked?.eligible)
        return _jsx(GameFrame, { mode: deployment ? "live" : "preview", selectionMode: picker ? "picker" : "host", friends: [friend], selectedFriendId: friend.id, ...picker, children: _jsxs("div", { className: "rf-runtime-status", role: checked?.error ? "alert" : "status", children: [_jsx("p", { children: checked?.error ?? "Checking ownership and hardwired eligibility…" }), checked?.error && _jsx("button", { type: "button", onClick: () => { setVerification(null); setAttempt(value => value + 1); }, children: "Retry eligibility" })] }) });
    if (deployment) {
        if (!walletClient)
            return _jsx(GameFrame, { mode: "live", friends: [friend], selectedFriendId: friend.id, ...picker, children: _jsx("p", { role: "alert", children: "Connect a wallet to send live game transactions." }) });
        return _jsx(EmbeddedSession, { picker: picker, friend: { ...friend, kind: "owned", walletAddress: checked.walletAddress }, definition: definition, frameUrl: frameUrl, live: { definition, deployment, friendId: friend.id, account: account,
                friendWallet: checked.walletAddress,
                publicClient: publicClient, walletClient, assertActive } }, frameUrl);
    }
    const ledgerKey = `${chainId}:${friend.id}:${checked.walletAddress.toLowerCase()}`;
    let client = ledgers.get(ledgerKey);
    if (!client) {
        client = createGamePreview(definition, { friendId: friend.id, stake: maximumPrize(definition) * 10n, rfBalance: 20n * RF }).client;
        ledgers.set(ledgerKey, client);
    }
    // Remount both the bridge and child on any identity/network/URL change.
    return _jsx(EmbeddedSession, { picker: picker, friend: { ...friend, kind: "owned", walletAddress: checked.walletAddress }, client: client, definition: definition, frameUrl: frameUrl }, frameUrl);
}
function EmbeddedSession({ friend, client, definition, live, frameUrl, picker }) {
    const liveRef = useRef(live);
    liveRef.current = live;
    const mode = live ? "live" : "preview";
    const epoch = useRef(0);
    const mounted = useRef(false);
    const [fundAmount, setFundAmount] = useState("1");
    const [funding, setFunding] = useState(false);
    const fundingRef = useRef(false);
    const actionPending = useRef(false);
    const [transactionPending, setTransactionPending] = useState(false);
    const [fundMessage, setFundMessage] = useState("");
    const iframe = useRef(null);
    const bridge = useRef(null);
    const pending = useRef(null);
    const paused = useRef(false);
    const [snapshot, setSnapshot] = useState(null);
    const [confirmation, setConfirmation] = useState(null);
    const [sessionError, setSessionError] = useState("");
    const [status, setStatus] = useState("loading");
    const [attempt, setAttempt] = useState(0);
    const onMenuChange = useCallback((open) => { paused.current = open; bridge.current?.setPaused(open || fundingRef.current); }, []);
    useLayoutEffect(() => {
        mounted.current = true;
        let alive = true, timedOut = false, loaded = false;
        let documentId = null;
        let handshakeId = null;
        let timeout;
        const frame = iframe.current;
        setStatus("loading");
        setSessionError("");
        setConfirmation(null);
        function disconnect() {
            epoch.current++;
            bridge.current?.close();
            bridge.current = null;
            pending.current?.();
            actionPending.current = false;
            setTransactionPending(false);
            setSnapshot(null);
            setStatus("loading");
        }
        function startTimeout() {
            clearTimeout(timeout);
            timeout = window.setTimeout(() => {
                if (!alive)
                    return;
                timedOut = true;
                disconnect();
                setStatus("error");
            }, 10_000);
        }
        function load() {
            if (!alive)
                return;
            // A WindowProxy survives navigation; the old port and approval must not.
            disconnect();
            documentId = null;
            handshakeId = null;
            loaded = true;
            timedOut = false;
            startTimeout();
            frame.contentWindow?.postMessage({ type: "friendsdk:connect" }, "*");
        }
        startTimeout();
        function authorize(method, args) {
            return new Promise((resolve, reject) => {
                if (!alive) {
                    reject(new Error("Game session changed."));
                    return;
                }
                const quantity = args[method === "redeem" ? 1 : 0];
                const outcome = method === "redeem" ? definition.outcomes[Number(args[0]) - 1] : undefined;
                let finished = false;
                const finish = (approved) => {
                    if (finished)
                        return;
                    finished = true;
                    pending.current = null;
                    if (alive)
                        setConfirmation(null);
                    if (approved && alive)
                        resolve();
                    else
                        reject(new Error("Game action cancelled."));
                };
                pending.current = () => finish(false);
                setConfirmation({
                    title: method === "buy" ? `Buy ${definition.consumable.toLowerCase()}` : method === "play" ? `Use ${definition.consumable.toLowerCase()}` : method === "settle" ? "Resolve result" : "Redeem reward",
                    description: method === "buy" ? `${quantity} ${definition.consumable.toLowerCase()} for ${friend.label}.${liveRef.current ? " Approves the exact RF cost, then purchases with the Friend wallet. Each transaction requires your wallet confirmation and ETH gas." : ""}`
                        : method === "play" ? `Use ${quantity} ${definition.consumable.toLowerCase()} from ${friend.label}.`
                            : method === "settle" ? `RNG request: ${formatEther(LIVE_GAME_MAX_ORACLE_FEE)} ETH, plus transaction gas. Request the Dice result and settle this play. Pending plays reuse their existing request without another RNG fee or consumable.`
                                : `${quantity} ${outcome.name}; ${liveRef.current ? "RF" : "simulated RF"} returns to this Friend.`,
                    notice: method === "settle" ? "Rare Friends plans to subsidize RNG costs for all developers to improve the user experience and reduce costs. This demo does not include the subsidy; it demonstrates the paid RNG flow." : undefined,
                    amount: method === "buy" ? definition.price * quantity : outcome ? outcome.reward * quantity : undefined,
                    onConfirm: () => finish(true), onCancel: () => finish(false),
                });
            });
        }
        function ready(event) {
            if (!alive || event.source !== frame.contentWindow)
                return;
            if (documentId === event.data?.documentId && handshakeId === event.data?.handshakeId) {
                if (event.data.type === "friendsdk:unloading") {
                    disconnect();
                    loaded = false;
                    documentId = null;
                    handshakeId = null;
                    startTimeout();
                    return;
                }
                if (event.data.type === "friendsdk:reset") {
                    disconnect();
                    handshakeId = null;
                    startTimeout();
                    return;
                }
            }
            if (timedOut || event.data?.type !== "friendsdk:ready" || typeof event.data.documentId !== "string" ||
                typeof event.data.handshakeId !== "string" || event.data.documentId.length > 200 || event.data.handshakeId.length > 200)
                return;
            // Detect replacement even if the new child's effect runs before its load event.
            if (documentId && documentId !== event.data.documentId) {
                disconnect();
                loaded = false;
                documentId = null;
                handshakeId = null;
                startTimeout();
            }
            if (documentId === event.data.documentId && handshakeId !== event.data.handshakeId)
                disconnect();
            if (!loaded || bridge.current)
                return;
            documentId = event.data.documentId;
            handshakeId = event.data.handshakeId;
            const channel = new MessageChannel();
            const bridgeEpoch = ++epoch.current;
            let activeClient;
            try {
                activeClient = liveRef.current ? createLiveGameClient({ ...liveRef.current, assertActive() {
                        if (!alive || epoch.current !== bridgeEpoch)
                            throw new Error("Game session changed.");
                        liveRef.current?.assertActive?.();
                    } }) : client;
            }
            catch (error) {
                channel.port1.close();
                channel.port2.close();
                clearTimeout(timeout);
                setSessionError(error instanceof Error ? error.message : "Invalid game deployment.");
                setStatus("error");
                return;
            }
            clearTimeout(timeout);
            const connection = bindGameFrame(channel.port1, { client: activeClient, authorize,
                onActionChange(value) { actionPending.current = value; if (alive)
                    setTransactionPending(value); },
                onError(error, method) {
                    if (alive && method === "read") {
                        setSessionError(error.message);
                        setStatus("error");
                    }
                }, onSnapshot(value) {
                    if (!alive || bridge.current !== connection)
                        return;
                    clearTimeout(timeout);
                    setSnapshot(value);
                    setStatus("ready");
                } });
            bridge.current = connection;
            // An allow-scripts sandbox has an opaque origin: exact source-window check above
            // is the trust boundary, and * is required when transferring to that child.
            frame.contentWindow.postMessage({ type: "friendsdk:init", documentId, handshakeId, friendId: friend.id, mode: activeClient.mode }, "*", [channel.port2]);
            bridge.current.setPaused(paused.current);
        }
        frame.addEventListener("load", load);
        window.addEventListener("message", ready);
        return () => {
            alive = false;
            mounted.current = false;
            epoch.current++;
            clearTimeout(timeout);
            frame.removeEventListener("load", load);
            window.removeEventListener("message", ready);
            bridge.current?.close();
            bridge.current = null;
            pending.current?.();
        };
    }, [client, definition, friend.id, attempt]);
    async function topUp() {
        if (fundingRef.current || actionPending.current || !liveRef.current)
            return;
        fundingRef.current = true;
        setFunding(true);
        setFundMessage("");
        bridge.current?.setPaused(true);
        const startedEpoch = epoch.current;
        try {
            const amount = parseUnits(fundAmount, 18);
            if (!/^[0-9]+(?:\.[0-9]{1,18})?$/.test(fundAmount) || amount <= 0n)
                throw new Error("Enter a positive RF amount with at most 18 decimal places.");
            const hash = await fundFriendWallet({ ...liveRef.current, amount, assertActive() {
                    if (!mounted.current || epoch.current !== startedEpoch)
                        throw new Error("Game session changed.");
                    liveRef.current?.assertActive?.();
                } });
            if (!mounted.current || epoch.current !== startedEpoch)
                return;
            setFundMessage(`RF transfer confirmed: ${hash}`);
            setAttempt(value => value + 1);
        }
        catch (cause) {
            if (mounted.current)
                setFundMessage(cause instanceof Error ? cause.message : "RF transfer failed.");
        }
        finally {
            fundingRef.current = false;
            if (mounted.current) {
                setFunding(false);
                bridge.current?.setPaused(paused.current);
            }
        }
    }
    return _jsxs(GameFrame, { mode: mode, selectionMode: picker ? "picker" : "host", friends: [friend], selectedFriendId: friend.id, wallet: { balance: snapshot?.rfBalance, status: snapshot ? "ready" : "loading" }, walletActions: live ? _jsxs("div", { className: "rf-runtime-connection", children: [_jsx("p", { children: "Transfer RF from your connected wallet to this Friend to buy bait. This is a real RF transfer plus ETH gas." }), _jsxs("label", { children: ["RF amount ", _jsx("input", { "aria-label": "RF amount", value: fundAmount, disabled: funding, inputMode: "decimal", onChange: event => setFundAmount(event.target.value) })] }), _jsx("button", { type: "button", disabled: funding || transactionPending, onClick: () => { void topUp(); }, children: funding ? "Confirming transfer…" : "Transfer RF to Friend" }), transactionPending && _jsx("p", { role: "status", children: "Finish the pending game action before transferring RF." }), fundMessage && _jsx("p", { role: "status", children: fundMessage })] }) : undefined, confirmation: confirmation, onMenuChange: onMenuChange, ...picker, children: [_jsx("iframe", { ref: iframe, src: frameUrl, title: definition.name, sandbox: "allow-scripts", referrerPolicy: "no-referrer" }, attempt), status !== "ready" && _jsxs("div", { className: "rf-runtime-status", role: status === "error" ? "alert" : "status", children: [_jsx("p", { children: status === "loading" ? live ? "Loading live game…" : "Loading game preview…" : sessionError || "The game could not connect. Check the frame URL and its asset permissions." }), status === "error" && _jsx("button", { type: "button", onClick: () => setAttempt(value => value + 1), children: "Retry game" })] })] });
}
