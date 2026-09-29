import { type Address, type PublicClient } from "viem";
import { type ChanceDeployment, type ChancePublicClient, type ChanceWalletClient } from "./chain.js";
import { type ChanceGameDefinition, type GameClient } from "./game.js";
export type LiveGameDeployment = ChanceDeployment & Readonly<{
    entropy: Address;
    provider: Address;
    deploymentBlock?: bigint;
}>;
export type LiveGamePublicClient = ChancePublicClient & Pick<PublicClient, "getLogs">;
/** The host must disclose this maximum plus gas before authorizing settlement. */
export declare const LIVE_GAME_MAX_ORACLE_FEE = 25000000000000n;
export type LiveGameOptions = Readonly<{
    definition: ChanceGameDefinition;
    deployment: LiveGameDeployment;
    friendId: bigint;
    account: Address;
    publicClient: LiveGamePublicClient;
    walletClient: ChanceWalletClient;
    assertActive?: () => void | Promise<void>;
    maxOracleFee?: bigint;
    waitMs?: number;
    /** Canonical wallet resolved by the trusted runtime during initial eligibility. */
    friendWallet?: Address;
}>;
/** Trusted runtime adapter only. Never pass its wallet or public client into a game frame. */
export declare function createLiveGameClient(options: LiveGameOptions): GameClient;
