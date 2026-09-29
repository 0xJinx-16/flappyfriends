/** Display data only. Inventories and rewards come from the game service. */
export type GameItem = Readonly<{
    id: string;
    name: string;
    description?: string;
    rarity?: string;
    art?: Readonly<{
        rows: readonly string[];
    }>;
    /** Optional display precision; this does not configure a token or launch an economy. */
    token?: Readonly<{
        decimals: number;
    }>;
}>;
export type GameItemQuantities = Readonly<Record<string, bigint>>;
export type GameShopOffer = Readonly<{
    id: string;
    itemId: string;
    quantity: bigint;
    price: bigint;
}>;
export type GameReward = Readonly<{
    id: string;
    itemId: string;
    quantity: bigint;
}>;
/** Base units stay exact; no balance passes through Number. */
export declare function formatGameItemQuantity(item: GameItem, quantity: bigint): string;
