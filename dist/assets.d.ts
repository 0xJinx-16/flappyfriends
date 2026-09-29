import { type WorldConfig, type WorldRenderOptions } from "./friend-world.js";
/** Browser image load, with explicit errors and cancellation for unmounted scenes. */
export declare function loadImage(source: string, signal?: AbortSignal): Promise<HTMLImageElement>;
/** Intended for SVG produced by the world renderer, not arbitrary HTML. */
export declare function loadSvg(svg: string, signal?: AbortSignal): Promise<HTMLImageElement>;
export declare function loadWorldAssets(world: WorldConfig, options?: WorldRenderOptions, signal?: AbortSignal): Promise<{
    width: number;
    height: number;
    terrain: HTMLImageElement;
    objects: {
        image: HTMLImageElement;
        kind: "prop" | "signal";
        x: number;
        y: number;
        depth: number;
    }[];
}>;
