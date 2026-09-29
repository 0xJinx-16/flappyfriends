import { type WorldConfig, type WorldPoint } from "./friend-world.js";
export type GameWorldInteraction = Readonly<{
    id: string;
    label: string;
    position: WorldPoint;
    reach?: number;
    /** Vertical label offset in the native 960 × 640 viewport; keep nearby touch targets apart. */
    labelOffset?: number;
}>;
export type GameWorldProps = {
    friendId: bigint;
    world: WorldConfig;
    spawn: WorldPoint;
    interactions: readonly GameWorldInteraction[];
    paused?: boolean;
    reducedMotion?: boolean;
    onInteract: (id: string) => void;
};
/** A game viewport, with canonical pixels, terrain, collision and input; adds no frame or identity flow. */
export declare function GameWorld({ friendId, world, spawn, interactions, paused, reducedMotion, onInteract }: GameWorldProps): import("react/jsx-runtime").JSX.Element;
