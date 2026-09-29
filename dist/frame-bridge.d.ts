import type { ChanceGameDefinition, GameSnapshot, GameClient } from './game.js';
export type GameMethod = 'read' | 'canBuy' | 'buy' | 'play' | 'settle' | 'redeem';
export type GameArguments = readonly (bigint | number)[];
/** Trusted host only. Transfer the other port to the exact sandboxed iframe window. */
export declare function bindGameFrame(port: MessagePort, options: {
    client: GameClient;
    authorize: (method: GameMethod, args: GameArguments) => Promise<void>;
    onSnapshot?: (snapshot: GameSnapshot) => void;
    onError?: (error: Error, method: GameMethod) => void;
    onActionChange?: (busy: boolean) => void;
}): {
    setPaused(value: boolean): void;
    close(): void;
};
/** Game-side client. No signer, account selection, deployment, or arbitrary RPC. */
export declare function createFrameGameClient(port: MessagePort, definition: ChanceGameDefinition, onPause?: (paused: boolean) => void, mode?: GameClient["mode"]): {
    client: Readonly<Readonly<{
        mode: "preview" | "chain";
        definition: ChanceGameDefinition;
        read(): Promise<GameSnapshot>;
        canBuy(quantity: bigint): Promise<boolean>;
        buy(quantity: bigint): Promise<void>;
        play(quantity?: bigint): Promise<readonly import("./game.js").GamePlay[]>;
        settle(playId: bigint): Promise<import("./game.js").GamePlay>;
        redeem(outcomeId: number, quantity: bigint): Promise<void>;
    }>>;
    close: () => void;
};
