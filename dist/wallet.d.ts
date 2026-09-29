import { type Address, type PublicClient } from "viem";
/** Trusted runtime wallet provider. Never pass this provider into a game frame. */
export interface FriendWalletProvider {
    request(args: {
        method: string;
        params?: readonly unknown[] | object;
    }): Promise<unknown>;
    on(event: "accountsChanged" | "chainChanged" | "connect" | "disconnect", listener: (...args: unknown[]) => void): unknown;
    removeListener(event: "accountsChanged" | "chainChanged" | "connect" | "disconnect", listener: (...args: unknown[]) => void): unknown;
}
export type FriendWalletChoice = Readonly<{
    id: string;
    name: string;
}>;
export type FriendWalletSnapshot = Readonly<{
    status: "unavailable" | "disconnected" | "connecting" | "switching-network" | "connected" | "wrong-network" | "error";
    wallets: readonly FriendWalletChoice[];
    selectedWalletId: string | null;
    account: Address | null;
    chainId: number | null;
    /** Changes before identity can change; invalidate ownership reads and confirmations with it. */
    revision: number;
    error: string | null;
}>;
export type FriendWalletSessionOptions = Readonly<{
    /** Reuse the current project's provider. Supplying it disables discovery of other wallets. */
    provider?: FriendWalletProvider;
    /** Defaults to this window. Used by non-browser mounts and tests; never use a parent window. */
    target?: EventTarget & {
        ethereum?: unknown;
    };
}>;
/** SDK defaults are public read-only infrastructure; no account, signer or API key is needed. */
export declare function createFriendPublicClient(options?: {
    rpcUrl?: string;
    batch?: boolean;
}): PublicClient;
/**
 * Trusted local connection lifecycle, independent of any website or game.
 * Discovery/restoration never prompts. Call connect() from the player's button.
 * Account/network/provider changes synchronously clear identity before re-reading it.
 * This session proves no NFT ownership: use readGenerationEligibility before play.
 */
export declare function createFriendWalletSession(options?: FriendWalletSessionOptions): Readonly<{
    getSnapshot: () => Readonly<{
        status: "unavailable" | "disconnected" | "connecting" | "switching-network" | "connected" | "wrong-network" | "error";
        wallets: readonly FriendWalletChoice[];
        selectedWalletId: string | null;
        account: Address | null;
        chainId: number | null;
        /** Changes before identity can change; invalidate ownership reads and confirmations with it. */
        revision: number;
        error: string | null;
    }>;
    /** Trusted runtime only; live actions still require explicit player confirmation. */
    getProvider: () => FriendWalletProvider | null;
    subscribe(listener: () => void): () => void;
    /** Only invoke from a user gesture. Connecting does not sign or spend. */
    connect(walletId?: string): Promise<Readonly<{
        status: "unavailable" | "disconnected" | "connecting" | "switching-network" | "connected" | "wrong-network" | "error";
        wallets: readonly FriendWalletChoice[];
        selectedWalletId: string | null;
        account: Address | null;
        chainId: number | null;
        /** Changes before identity can change; invalidate ownership reads and confirmations with it. */
        revision: number;
        error: string | null;
    }>>;
    refresh: () => Promise<Readonly<{
        status: "unavailable" | "disconnected" | "connecting" | "switching-network" | "connected" | "wrong-network" | "error";
        wallets: readonly FriendWalletChoice[];
        selectedWalletId: string | null;
        account: Address | null;
        chainId: number | null;
        /** Changes before identity can change; invalidate ownership reads and confirmations with it. */
        revision: number;
        error: string | null;
    }>>;
    /** Only invoke from a user gesture. This requests a network change, never a transaction. */
    switchNetwork(): Promise<Readonly<{
        status: "unavailable" | "disconnected" | "connecting" | "switching-network" | "connected" | "wrong-network" | "error";
        wallets: readonly FriendWalletChoice[];
        selectedWalletId: string | null;
        account: Address | null;
        chainId: number | null;
        /** Changes before identity can change; invalidate ownership reads and confirmations with it. */
        revision: number;
        error: string | null;
    }>>;
    /** Forget this local session. Does not revoke permissions or modify the wallet. */
    disconnect(): void;
    dispose(): void;
}>;
export type FriendWalletSession = ReturnType<typeof createFriendWalletSession>;
