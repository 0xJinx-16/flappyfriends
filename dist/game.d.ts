/** Reference RF chance-game rules and a wallet-free ledger simulation. No chain calls or signing. */
export declare const RF: bigint;
export type ChanceOutcome = Readonly<{
    name: string;
    chanceBps: number;
    reward: bigint;
}>;
export type ChanceGameDefinition = Readonly<{
    name: string;
    consumable: string;
    price: bigint;
    outcomes: readonly ChanceOutcome[];
}>;
export type GamePlay = Readonly<{
    id: bigint;
    outcomeId: number | null;
}>;
export type GameSnapshot = Readonly<{
    mode: 'preview' | 'chain';
    friendId: bigint;
    rfBalance: bigint;
    consumables: bigint;
    stake: bigint;
    freeStake: bigint;
    reservedPlays: bigint;
    rewardLiability: bigint;
    inventory: readonly bigint[];
    plays: readonly GamePlay[];
}>;
/** Player actions; randomness and funding are provided separately by the platform. */
export type GameClient = Readonly<{
    mode: 'preview' | 'chain';
    definition: ChanceGameDefinition;
    read(): Promise<GameSnapshot>;
    canBuy(quantity: bigint): Promise<boolean>;
    buy(quantity: bigint): Promise<void>;
    play(quantity?: bigint): Promise<readonly GamePlay[]>;
    settle(playId: bigint): Promise<GamePlay>;
    redeem(outcomeId: number, quantity: bigint): Promise<void>;
}>;
export type PreviewGameClient = GameClient & Readonly<{
    mode: 'preview';
}>;
export declare function defineChanceGame(input: ChanceGameDefinition): ChanceGameDefinition;
/** Read the reviewable JSON format; RF values are decimal strings in 18-decimal base units. */
export declare function parseChanceGame(input: unknown): ChanceGameDefinition;
export declare function maximumPrize(game: ChanceGameDefinition): bigint;
/** Exact weighted sum, rounded down once to RF base units. */
export declare function expectedReward(game: ChanceGameDefinition): bigint;
/** Return the contract's one-based outcome ID for a roll in [0, 10000). */
export declare function outcomeForRoll(game: ChanceGameDefinition, roll: number): number;
/** Browser entropy is for preview only. Rejection sampling keeps all 10000 buckets equal. */
export declare function samplePreviewRoll(): number;
export declare function createGamePreview(input: ChanceGameDefinition, options: Readonly<{
    stake: bigint;
    rfBalance: bigint;
    friendId?: bigint;
    draw?: () => number;
}>): Readonly<{
    client: PreviewGameClient;
    fund(amount: bigint): void;
    withdraw(amount: bigint): void;
}>;
