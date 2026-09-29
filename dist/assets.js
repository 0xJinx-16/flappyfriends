import { renderWorldLayers } from "./friend-world.js";
/** Browser image load, with explicit errors and cancellation for unmounted scenes. */
export function loadImage(source, signal) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(signal.reason);
            return;
        }
        const image = new Image();
        const clear = () => { image.onload = null; image.onerror = null; signal?.removeEventListener("abort", abort); };
        const abort = () => { clear(); image.src = ""; reject(signal?.reason); };
        image.onload = () => { clear(); resolve(image); };
        image.onerror = () => { clear(); reject(new Error("The image could not load.")); };
        signal?.addEventListener("abort", abort, { once: true });
        image.src = source;
    });
}
/** Intended for SVG produced by the world renderer, not arbitrary HTML. */
export function loadSvg(svg, signal) {
    return loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`, signal);
}
export async function loadWorldAssets(world, options = {}, signal) {
    const layers = renderWorldLayers(world, options);
    const [terrain, objects] = await Promise.all([
        loadSvg(layers.terrainSvg, signal),
        Promise.all(layers.objects.map(async ({ svg, ...object }) => ({ ...object, image: await loadSvg(svg, signal) }))),
    ]);
    return { width: layers.width, height: layers.height, terrain, objects };
}
