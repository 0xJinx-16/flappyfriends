import { type CSSProperties, type ReactNode } from "react";
import type { GameItem, GameItemQuantities, GameReward, GameShopOffer } from "./items.js";
import { type RewardRevealCompletion, type RewardRevealPhase, type RewardRevealProps } from "./reward-reveal.js";
export type GameStyle = CSSProperties & Partial<Record<`--game-${string}`, string | number>>;
export type GameCurrency = Readonly<{
    symbol: string;
    decimals: number;
}>;
export type ExperiencePanelStage = "activity" | "review" | "pending" | "working" | "reward" | "shop";
export type ExperienceDataAttributes = Partial<Record<`data-${string}`, string | number | boolean>>;
/** Every choice is visible at once. Larger menus must be split into separate activities or shops. */
export declare const GAME_VISIBLE_CHOICES = 6;
/** Exact base-unit formatting. Balances and prices never pass through Number. */
export declare function formatGameAmount(value: bigint, decimals?: number): string;
export declare function Keycap({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function ItemArt({ item, className }: {
    item: GameItem;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export type ItemPickerProps = {
    items: readonly GameItem[];
    counts?: GameItemQuantities;
    selectedItemId?: string | null;
    onSelectItem?: (itemId: string) => void;
    label?: string;
    itemArt?: (item: GameItem) => ReactNode;
    /** @deprecated All choices are displayed together; retained for source compatibility. */
    previousLabel?: string;
    /** @deprecated All choices are displayed together; retained for source compatibility. */
    nextLabel?: string;
};
/** All item artwork and quantities stay visible. Unowned items cannot be selected. */
export declare function ItemPicker({ items, counts, selectedItemId, onSelectItem, label, itemArt }: ItemPickerProps): import("react/jsx-runtime").JSX.Element;
export type ExperienceLabels = {
    activityLocation: string;
    shopLocation: string;
    rewardLocation: string;
    activityTitle: string;
    activityDescription: string;
    action: string;
    selectItem: string;
    reviewTitle: string;
    reviewDescription: string;
    confirm: string;
    cancel: string;
    pendingTitle: string;
    pendingDescription: string;
    workingTitle: string;
    readyTitle: string;
    workingDescription: string;
    readyDescription: string;
    resolve: string;
    waiting: string;
    rewardTitle: string;
    keep: string;
    openShop: string;
    emptyInventory: string;
    emptyShop: string;
    buy: string;
    sell: string;
    returnToActivity: string;
    close: string;
    balance: string;
    item: string;
    total: string;
    value: string;
    reviewNotice: string;
    insufficientBalance: string;
    missingItems: string;
    buyTab: string;
    sellTab: string;
    activityCost: string;
    anticipationTitle: string;
    emergenceTitle: string;
    reveal: string;
    previousOffer: string;
    nextOffer: string;
    previousInventory: string;
    nextInventory: string;
    previousChoices: string;
    nextChoices: string;
};
export type ExperiencePanelProps = {
    stage: ExperiencePanelStage;
    itemCatalog: readonly GameItem[];
    itemCounts?: GameItemQuantities;
    selectableItemIds?: readonly string[];
    selectedItemId?: string | null;
    activeItemId?: string | null;
    /** Zero permits an activity without selecting or consuming an item. */
    itemCost?: bigint;
    /** Fixed requirements, added to any selected-item cost before checking stock. */
    requirements?: GameItemQuantities;
    balance: bigint;
    currency?: GameCurrency;
    shopOffers?: readonly GameShopOffer[];
    sellOffers?: readonly GameShopOffer[];
    purchase?: GameShopOffer | null;
    inventory?: readonly GameReward[];
    reward?: GameReward | null;
    rewardValue?: bigint;
    /** The host may block purchases independently of activity item ownership. */
    purchaseDisabled?: boolean;
    shopTab?: "buy" | "sell";
    pendingStep?: number;
    pendingSteps?: readonly string[];
    status?: string;
    error?: string;
    workingReady?: boolean;
    revealKey?: string | number;
    reducedMotion?: boolean;
    onRevealPhase?: (phase: RewardRevealPhase, item: GameItem) => void;
    onRevealComplete?: (item: GameItem, reason: RewardRevealCompletion) => void;
    onSelectItem?: (itemId: string) => void;
    onBuy?: (offerId: string) => void;
    onSell?: (inventoryId: string, offerId: string) => void;
    onSellReward?: () => void;
    /** Host redemption policy; keep collectibles visible while disabling unavailable sales. */
    canSellReward?: (reward: GameReward) => boolean;
    onAction?: () => void;
    onConfirm?: () => void;
    onResolve?: () => void;
    onKeep?: () => void;
    onShop?: () => void;
    onReturn?: () => void;
    onClose?: () => void;
    onShopTabChange?: (tab: "buy" | "sell") => void;
    labels?: Partial<ExperienceLabels>;
    slots?: {
        activityArt?: ReactNode;
        workingArt?: ReactNode;
        pendingArt?: ReactNode;
        emptyArt?: ReactNode;
        itemArt?: (item: GameItem) => ReactNode;
        headerActions?: ReactNode;
        footer?: ReactNode;
        reveal?: (props: RewardRevealProps) => ReactNode;
        rewardDetails?: ReactNode;
    };
    className?: string;
    style?: GameStyle;
    dataAttributes?: ExperienceDataAttributes;
};
/** Bounded presentation. The host owns focus, permissions, balances, and settlement. */
export declare function ExperiencePanel({ stage, itemCatalog, itemCounts, selectableItemIds, selectedItemId, activeItemId, itemCost, requirements, balance, currency, shopOffers, sellOffers, purchase, inventory, reward, rewardValue, purchaseDisabled, shopTab: controlledTab, pendingStep, pendingSteps, status, error, workingReady, revealKey, reducedMotion, onRevealPhase, onRevealComplete, onSelectItem, onBuy, onSell, onSellReward, canSellReward, onAction, onConfirm, onResolve, onKeep, onShop, onReturn, onClose, onShopTabChange, labels: overrides, slots, className, style, dataAttributes, }: ExperiencePanelProps): import("react/jsx-runtime").JSX.Element;
export type GameHudProps = {
    balance: bigint;
    currency?: GameCurrency;
    inventoryCount?: bigint;
    itemCount?: bigint;
    itemCountLabel?: string;
    quest?: string;
    onReset?: () => void;
    onInventory?: () => void;
    labels?: {
        balance?: string;
        inventory?: string;
        reset?: string;
    };
    slots?: {
        inventoryIcon?: ReactNode;
    };
    className?: string;
    style?: GameStyle;
};
export declare function GameHud({ balance, currency, inventoryCount, itemCount, itemCountLabel, quest, onReset, onInventory, labels, slots, className, style }: GameHudProps): import("react/jsx-runtime").JSX.Element;
export type ActivityPromptProps = {
    label: string;
    detail?: string;
    active?: boolean;
    pulse?: boolean;
    onClick?: () => void;
    keyLabel?: string;
    className?: string;
    style?: GameStyle;
    dataAttributes?: ExperienceDataAttributes;
};
export declare function ActivityPrompt({ label, detail, active, pulse, onClick, keyLabel, className, style, dataAttributes }: ActivityPromptProps): import("react/jsx-runtime").JSX.Element;
