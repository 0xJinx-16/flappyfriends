import { type Address, type PublicClient } from "viem";
export declare const GENERATION_ELIGIBILITY_ABI: readonly [{
    readonly name: "ownerOf";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "tokenId";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "generation";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "tokenId";
    }];
    readonly outputs: readonly [{
        readonly type: "uint8";
    }];
}];
export type GenerationIdentityClient = Pick<PublicClient, "readContract" | "getChainId" | "getBlockNumber">;
export type GenerationDeployment = Readonly<{
    chainId: number;
    generations: Address;
    /** First possible Transfer block. Omit only when the deployment block is unknown. */
    transferStartBlock?: bigint;
}>;
/** Fresh ownership of a hardwired Generations NFT. Artwork and activation confer no permission. */
export declare function readGenerationEligibility(client: GenerationIdentityClient, tokenId: bigint, player?: Address, deployment?: GenerationDeployment): Promise<{
    readonly owner: `0x${string}`;
    readonly generation: number;
    readonly hardwired: boolean;
    readonly ownedByPlayer: boolean | null;
    readonly eligible: boolean | null;
    readonly blockNumber: bigint;
}>;
