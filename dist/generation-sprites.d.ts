import { type Address, type PublicClient } from "viem";
/** A pinned artwork version. Generations.setRenderer can select a different version later. */
export declare const GENERATION_SPRITE_MANIFEST: Readonly<{
    chainId: 4663;
    rpcUrl: "https://rpc.mainnet.chain.robinhood.com";
    generations: Address;
    /** First Transfer emitted by the canonical Generations collection. */
    transferStartBlock: 63102373n;
    metadata: Address;
    registry: Address;
    worldData: Address;
    seededLandscape: Address;
}>;
export type GenerationSpriteManifest = Readonly<{
    chainId: number;
    rpcUrl: string;
    generations: Address;
    transferStartBlock?: bigint;
    metadata: Address;
    registry: Address;
    worldData: Address;
    seededLandscape: Address;
}>;
export declare const FAMILIES_REGISTRY_ABI: readonly [{
    readonly name: "familyOf";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "tokenId";
    }];
    readonly outputs: readonly [{
        readonly type: "uint8";
    }];
}, {
    readonly name: "seedOf";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [{
        readonly type: "uint256";
        readonly name: "tokenId";
    }];
    readonly outputs: readonly [{
        readonly type: "uint32";
    }];
}, {
    readonly name: "familyName";
    readonly type: "function";
    readonly stateMutability: "pure";
    readonly inputs: readonly [{
        readonly type: "uint8";
        readonly name: "id";
    }];
    readonly outputs: readonly [{
        readonly type: "string";
    }];
}, {
    readonly name: "module";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint8";
        readonly name: "id";
    }];
    readonly outputs: readonly [{
        readonly type: "address";
    }];
}, {
    readonly name: "portrait";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint8";
        readonly name: "id";
    }, {
        readonly type: "uint32";
        readonly name: "seed";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256";
    }];
}, {
    readonly name: "frames";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint8";
        readonly name: "id";
    }, {
        readonly type: "uint32";
        readonly name: "seed";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256[64]";
    }];
}, {
    readonly name: "sceneFrames";
    readonly type: "function";
    readonly stateMutability: "view";
    readonly inputs: readonly [{
        readonly type: "uint8";
        readonly name: "id";
    }, {
        readonly type: "uint32";
        readonly name: "seed";
    }];
    readonly outputs: readonly [{
        readonly type: "uint256[64]";
    }];
}];
export declare const GENERATION_FAMILY_NAMES: readonly ["Skeleton", "Mask", "Family", "Cellular", "Asymmetry", "Hoverer", "Colossus", "Sparkling", "Hollow"];
export declare const SPRITE_FACINGS: readonly ["down", "up", "left", "right"];
export type SpriteFacing = typeof SPRITE_FACINGS[number];
export type SpriteFrame = Readonly<{
    bitmap: bigint;
    rows: readonly string[];
}>;
type SpriteClips = Readonly<Record<SpriteFacing, readonly SpriteFrame[]>>;
export type GenerationSprites = Readonly<{
    tokenId: bigint;
    familyId: number;
    familyName: typeof GENERATION_FAMILY_NAMES[number];
    seed: number;
    frames: readonly bigint[];
    clips: Readonly<{
        idle: SpriteClips;
        walk: SpriteClips;
    }>;
    cacheKey: string;
}>;
export type GenerationSpriteClient = Pick<PublicClient, "readContract" | "getChainId">;
/** Bit 0 is the top-left pixel; bit 255 is the bottom-right. No mirroring or cropping. */
export declare function decodeSpriteBitmap(bitmap: bigint): SpriteFrame;
export declare function generationSpriteCacheKey(tokenId: bigint, manifest?: GenerationSpriteManifest): string;
/** Build all eight clips without inventing the missing Colossus directions. */
export declare function decodeGenerationSprites(tokenId: bigint, familyId: number, seed: number, bitmaps: readonly bigint[], manifest?: GenerationSpriteManifest): GenerationSprites;
/** For vertical Colossus motion, retain the last horizontal direction (right by default). */
export declare function spriteFrame(sprites: GenerationSprites, facing: SpriteFacing, walking: boolean, frame: number, sideFallback?: "left" | "right"): {
    readonly frame: Readonly<{
        bitmap: bigint;
        rows: readonly string[];
    }>;
    readonly requestedFacing: "down" | "up" | "left" | "right";
    readonly resolvedFacing: "down" | "up" | "left" | "right";
    readonly usedFallback: boolean;
};
/** Inject a viem public client. Only immutable art is cached; errors are retryable. */
export declare function createGenerationSpriteReader(client: GenerationSpriteClient, manifest?: GenerationSpriteManifest): {
    read(tokenId: bigint): Promise<GenerationSprites>;
    clear(): void;
};
export {};
