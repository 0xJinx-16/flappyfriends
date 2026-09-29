export * from "./generation-sprites.js";
export declare function createFriendReader(): {
    read(tokenId: bigint): Promise<import("./generation-sprites.js").GenerationSprites>;
    clear(): void;
};
