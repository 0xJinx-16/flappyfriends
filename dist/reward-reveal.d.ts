import { type CSSProperties, type ReactNode } from "react";
import type { GameItem } from "./items.js";
export type RewardRevealPhase = "anticipation" | "emergence" | "reveal" | "complete";
export type RewardRevealCompletion = "finished" | "skipped" | "reduced-motion";
export type RewardRevealProps = {
    item: GameItem;
    /** A receipt or reward ID. Changing it starts a new presentation. */
    revealKey: string | number;
    reducedMotion?: boolean;
    onPhase?: (phase: RewardRevealPhase, item: GameItem) => void;
    onComplete?: (item: GameItem, reason: RewardRevealCompletion) => void;
    /** Increment to finish from a control outside the artwork. */
    skipSignal?: number;
    showSkipControl?: boolean;
    skipLabel?: string;
    slots?: {
        itemArt?: ReactNode;
        anticipation?: ReactNode;
        emergence?: ReactNode;
        backdrop?: ReactNode;
    };
    className?: string;
    style?: CSSProperties & Partial<Record<`--game-${string}`, string | number>>;
};
export declare const REWARD_REVEAL_TIMING: Readonly<{
    emergence: 720;
    reveal: 1320;
    complete: 2400;
}>;
/** Presentation only: this component never selects an item or changes an inventory. */
export declare function RewardReveal(props: RewardRevealProps): import("react/jsx-runtime").JSX.Element;
