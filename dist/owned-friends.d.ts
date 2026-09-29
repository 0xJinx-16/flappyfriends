import { type Address, type PublicClient } from "viem";
import type { GenerationDeployment } from "./identity.js";
export type OwnedFriendsClient = Pick<PublicClient, "getLogs" | "readContract" | "getBlockNumber" | "getChainId">;
export type OwnedFriend = Readonly<{
    id: bigint;
    label: string;
    kind: "owned";
    walletAddress: Address;
    generation: number;
}>;
export type OwnedFriendsOptions = Readonly<{
    deployment?: GenerationDeployment;
    signal?: AbortSignal;
}>;
/**
 * Read-only discovery using paginated indexed, owner-filtered Transfer queries. The
 * canonical Generations contract has no ERC721Enumerable owner enumeration.
 * Only currently held IDs are read; totalMinted and global token scans are never
 * used. Providers must support the filtered history query without truncation.
 * Failures remain errors, never an empty/ineligible result or a scan fallback.
 *
 * This selection snapshot is not lasting authorization. The trusted wrapper
 * must freshly call readGenerationEligibility before enabling the selected game.
 */
export declare function readOwnedFriends(client: OwnedFriendsClient, account: Address, options?: OwnedFriendsOptions): Promise<Readonly<{
    friends: readonly OwnedFriend[];
    blockNumber: bigint;
    hiddenCount: number;
}>>;
