import { type ReactNode } from "react";
/** Reference viewport dimensions; hosts may choose another layout through frame.css. */
export declare const GAME_VIEWPORT: Readonly<{
    width: 960;
    height: 640;
}>;
export type GameFriend = Readonly<{
    id: bigint;
    label: string;
    walletAddress?: string;
    kind: "owned" | "sample";
}>;
export type GameWalletState = Readonly<{
    balance?: bigint;
    status?: "ready" | "loading" | "error";
    error?: string;
}>;
export type GameConfirmation = Readonly<{
    title: string;
    description: string;
    notice?: string;
    amount?: bigint;
    busy?: boolean;
    error?: string;
    onConfirm: () => void;
    onCancel: () => void;
}>;
export type GameFrameProps = {
    children: ReactNode;
    friends: readonly GameFriend[];
    selectedFriendId: bigint | null;
    onSelectFriend?: (id: bigint) => void;
    friendsLoading?: boolean;
    friendsError?: string;
    /** Only show the empty result after successful discovery; null suppresses it. */
    friendsEmptyMessage?: string | null;
    friendsHiddenCount?: number;
    /** Use host when the surrounding interface already owns selection and connection. */
    selectionMode?: "picker" | "host";
    onConnect?: () => void;
    wallet?: GameWalletState;
    confirmation?: GameConfirmation | null;
    connection?: ReactNode;
    walletActions?: ReactNode;
    mode: "preview" | "live";
    onMenuChange?: (open: boolean) => void;
};
/** An in-frame menu. Never portals into the website or opens a viewport-sized dialog. */
export declare function GameMenu({ title, onClose, children, footer }: {
    title: string;
    onClose?: () => void;
    children: ReactNode;
    footer?: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function GameFrame({ children, friends, selectedFriendId, onSelectFriend, friendsLoading, friendsError, friendsEmptyMessage, friendsHiddenCount, onConnect, wallet, confirmation, connection, walletActions, selectionMode, mode, onMenuChange }: GameFrameProps): import("react/jsx-runtime").JSX.Element;
