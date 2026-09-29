import { type Address, type Hex, type PublicClient, type WalletClient } from 'viem';
export type ChanceDeployment = Readonly<{
    chainId: number;
    game: Address;
    generations: Address;
    rf: Address;
}>;
export type ChancePublicClient = Pick<PublicClient, 'getChainId' | 'getBlockNumber' | 'getBlock' | 'readContract' | 'waitForTransactionReceipt'>;
export type ChanceWalletClient = Pick<WalletClient, 'chain' | 'getChainId' | 'getAddresses' | 'writeContract'>;
export type ChanceTransportOptions = Readonly<{
    deployment: ChanceDeployment;
    account: Address;
    publicClient: ChancePublicClient;
    walletClient?: ChanceWalletClient;
    confirmations?: number;
    selectedFriend?: Readonly<{
        friendId: bigint;
        recipient: Address;
    }>;
}>;
export type ChanceTransactionFailure = 'unconfirmed' | 'reverted' | 'replaced' | 'reorg' | 'unverified';
/** The transaction may already exist. Inspect its hash before attempting another action. */
export declare class ChanceTransactionError extends Error {
    readonly code: ChanceTransactionFailure;
    readonly transactionHash: Hex;
    constructor(code: ChanceTransactionFailure, transactionHash: Hex, message: string, options?: ErrorOptions);
}
/** Trusted-host transport. Never give this object or its wallet to community frames.
 * Construction does no RPC/signing. Each mutation is an explicit host action; approval
 * and purchase are separate. Confirmations are host policy, not consensus finality.
 */
export declare function createChanceGameTransport(options: ChanceTransportOptions): Readonly<{
    mode: "chain";
    deployment: Readonly<{
        game: `0x${string}`;
        generations: `0x${string}`;
        rf: `0x${string}`;
        chainId: number;
    }>;
    account: `0x${string}`;
    read(friendId: bigint): Promise<{
        payer: `0x${string}`;
        payerRF: bigint;
        recipientRF: bigint;
        consumables: bigint;
        stake: bigint;
        reservedPlays: bigint;
        rewardLiability: bigint;
        freeStake: bigint;
        price: bigint;
        maxPrize: bigint;
        outcomes: {
            id: bigint;
            chanceBps: number;
            reward: bigint;
            metadataURI: string;
            quantity: bigint;
        }[];
        friendId: bigint;
        owner: `0x${string}`;
        generation: number;
        recipient: `0x${string}`;
        canControl: boolean;
        mode: "chain";
        deployment: Readonly<{
            game: `0x${string}`;
            generations: `0x${string}`;
            rf: `0x${string}`;
            chainId: number;
        }>;
        blockNumber: bigint;
        blockHash: `0x${string}`;
    }>;
    approvePurchase(friendId: bigint, quantity: bigint): Promise<{
        mode: "chain";
        transactionHash: `0x${string}`;
        blockNumber: bigint;
        blockHash: `0x${string}`;
    } & {
        payer: `0x${string}`;
        spender: `0x${string}`;
        amount: bigint;
    }>;
    buy(friendId: bigint, quantity: bigint): Promise<{
        mode: "chain";
        transactionHash: `0x${string}`;
        blockNumber: bigint;
        blockHash: `0x${string}`;
    } & {
        friendId: bigint;
        quantity: bigint;
        payment: bigint;
        payer: `0x${string}`;
        recipient: `0x${string}`;
    }>;
    play(friendId: bigint, quantity?: bigint): Promise<{
        mode: "chain";
        transactionHash: `0x${string}`;
        blockNumber: bigint;
        blockHash: `0x${string}`;
    } & {
        friendId: bigint;
        plays: {
            playId: bigint;
            friendId: bigint;
            batchId: bigint;
            outcomeId: bigint;
        }[];
    }>;
    readPlay(playId: bigint): Promise<{
        playId: bigint;
        friendId: bigint;
        batchId: bigint;
        outcomeId: bigint;
        mode: "chain";
        blockNumber: bigint;
        blockHash: `0x${string}`;
    }>;
    settle(playId: bigint, committed?: Awaited<ReturnType<(playId: bigint, blockNumber: bigint) => Promise<{
        playId: bigint;
        friendId: bigint;
        batchId: bigint;
        outcomeId: bigint;
    }>>>): Promise<{
        mode: "chain";
        transactionHash: `0x${string}`;
        blockNumber: bigint;
        blockHash: `0x${string}`;
    } & {
        recipient: `0x${string}`;
        playId: bigint;
        friendId: bigint;
        batchId: bigint;
        outcomeId: bigint;
    }>;
    redeem(friendId: bigint, outcomeId: bigint, quantity: bigint): Promise<{
        mode: "chain";
        transactionHash: `0x${string}`;
        blockNumber: bigint;
        blockHash: `0x${string}`;
    } & {
        friendId: bigint;
        outcomeId: bigint;
        quantity: bigint;
        payment: bigint;
        recipient: `0x${string}`;
    }>;
}>;
