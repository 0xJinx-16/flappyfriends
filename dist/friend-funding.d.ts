import { type Hex } from "viem";
import type { LiveGameOptions } from "./live-game.js";
/** Trusted wallet menu only. Transfers the explicitly entered RF amount to the verified Friend wallet. */
export declare function fundFriendWallet(options: LiveGameOptions & {
    amount: bigint;
}): Promise<Hex>;
