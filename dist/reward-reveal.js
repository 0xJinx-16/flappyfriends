"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
export const REWARD_REVEAL_TIMING = Object.freeze({ emergence: 720, reveal: 1320, complete: 2400 });
const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (callback) => {
    const query = window.matchMedia(reducedQuery);
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
};
const readMotion = () => window.matchMedia(reducedQuery).matches;
const serverMotion = () => false;
function ItemBitmap({ item }) {
    const width = item.art?.rows.length ? Math.max(1, ...item.art.rows.map(row => row.length)) : 16;
    const height = item.art?.rows.length || 16;
    const path = (item.art?.rows ?? []).flatMap((row, y) => [...row].flatMap((pixel, x) => pixel === "#" ? [`M${x} ${y}h1v1h-1z`] : [])).join("");
    return _jsx("svg", { viewBox: `0 0 ${width} ${height}`, fill: "currentColor", shapeRendering: "crispEdges", children: path ? _jsx("path", { d: path }) : _jsx("path", { d: "M8 1 15 8 8 15 1 8Z" }) });
}
/** Presentation only: this component never selects an item or changes an inventory. */
export function RewardReveal(props) {
    return _jsx(RewardRevealSequence, { ...props }, props.revealKey);
}
function RewardRevealSequence({ item, reducedMotion, onPhase, onComplete, skipSignal = 0, showSkipControl = true, skipLabel = "Reveal reward", slots = {}, className = "", style }) {
    const systemReducedMotion = useSyncExternalStore(subscribeMotion, readMotion, serverMotion);
    const reduceMotion = reducedMotion ?? systemReducedMotion;
    const [phase, setPhase] = useState(reduceMotion ? "complete" : "anticipation");
    const callbacks = useRef({ item, onPhase, onComplete });
    const timers = useRef([]);
    const completed = useRef(false);
    const lastPhase = useRef(null);
    const previousSkipSignal = useRef(skipSignal);
    useEffect(() => { callbacks.current = { item, onPhase, onComplete }; }, [item, onPhase, onComplete]);
    const clearTimers = useCallback(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    }, []);
    const announcePhase = useCallback((next) => {
        if (lastPhase.current === next)
            return;
        lastPhase.current = next;
        callbacks.current.onPhase?.(next, callbacks.current.item);
    }, []);
    const finish = useCallback((reason) => {
        if (completed.current)
            return;
        completed.current = true;
        clearTimers();
        setPhase("complete");
        announcePhase("complete");
        callbacks.current.onComplete?.(callbacks.current.item, reason);
    }, [announcePhase, clearTimers]);
    useEffect(() => {
        if (completed.current)
            return;
        if (reduceMotion) {
            // A queued callback also cancels cleanly during Strict Mode's effect probe.
            timers.current = [setTimeout(() => finish("reduced-motion"), 0)];
        }
        else {
            announcePhase("anticipation");
            const advance = (next) => {
                if (completed.current)
                    return;
                setPhase(next);
                announcePhase(next);
            };
            timers.current = [
                setTimeout(() => advance("emergence"), REWARD_REVEAL_TIMING.emergence),
                setTimeout(() => advance("reveal"), REWARD_REVEAL_TIMING.reveal),
                setTimeout(() => finish("finished"), REWARD_REVEAL_TIMING.complete),
            ];
        }
        return clearTimers;
    }, [announcePhase, clearTimers, finish, reduceMotion]);
    useEffect(() => {
        if (previousSkipSignal.current === skipSignal)
            return;
        previousSkipSignal.current = skipSignal;
        finish("skipped");
    }, [finish, skipSignal]);
    const special = ["rare", "epic", "legendary", "mythic"].includes(item.rarity ?? "");
    const revealed = phase === "reveal" || phase === "complete";
    const itemArt = slots.itemArt ?? _jsx(ItemBitmap, { item: item });
    const particleCount = item.rarity === "mythic" ? 18 : item.rarity === "legendary" ? 14 : special ? 10 : item.rarity === "uncommon" ? 6 : 4;
    return _jsxs("div", { className: `rf-reward-reveal ${className}`.trim(), "data-reveal-phase": phase, "data-rarity": item.rarity, "data-reduced-motion": reduceMotion || undefined, "data-skip-control": showSkipControl || undefined, style: style, children: [_jsxs("div", { className: "rf-reward-scene", "aria-hidden": "true", inert: true, children: [slots.backdrop && _jsx("div", { className: "rf-reward-backdrop", children: slots.backdrop }), phase === "anticipation" && _jsx("div", { className: "rf-reward-anticipation", children: slots.anticipation ?? _jsxs("div", { className: "rf-reward-focus", children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("span", {})] }) }), phase === "emergence" && _jsx("div", { className: "rf-reward-emergence", children: slots.emergence ?? _jsx("div", { className: "rf-reward-silhouette", children: itemArt }) }), _jsx("div", { className: "rf-reward-halo" }), revealed && _jsx("div", { className: "rf-reward-item", children: itemArt }), _jsx("div", { className: "rf-reward-particles", children: Array.from({ length: particleCount }, (_, index) => _jsx("i", { style: { "--particle-index": index, "--particle-count": particleCount } }, index)) })] }), _jsx("span", { className: "rf-reward-announcement", role: "status", "aria-live": "polite", children: revealed ? [item.name, item.rarity].filter(Boolean).join(", ") : phase === "anticipation" ? "Preparing reward" : "Reward appearing" }), showSkipControl && _jsx("button", { type: "button", className: "rf-reward-skip", onClick: () => finish("skipped"), disabled: phase === "complete", "aria-label": phase === "complete" ? "Reward revealed" : skipLabel, children: phase === "complete" ? "Reward revealed" : skipLabel })] });
}
