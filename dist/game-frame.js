"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useId, useRef, useState } from "react";
import { formatGameAmount } from "./experience-ui.js";
/** Reference viewport dimensions; hosts may choose another layout through frame.css. */
export const GAME_VIEWPORT = Object.freeze({ width: 960, height: 640 });
/** An in-frame menu. Never portals into the website or opens a viewport-sized dialog. */
export function GameMenu({ title, onClose, children, footer }) {
    const id = useId();
    const node = useRef(null);
    useEffect(() => {
        const previous = document.activeElement;
        node.current?.focus();
        return () => { if (previous?.isConnected)
            previous.focus(); };
    }, []);
    return _jsx("div", { className: "rf-frame-scrim", children: _jsxs("div", { ref: node, className: "rf-frame-menu", role: "dialog", "aria-modal": "true", "aria-labelledby": id, tabIndex: -1, onKeyDown: event => {
                if (event.key === "Escape" && onClose) {
                    event.preventDefault();
                    onClose();
                }
                if (event.key !== "Tab")
                    return;
                const buttons = [...event.currentTarget.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], [tabindex="0"]')].filter(element => element.getClientRects().length > 0);
                const first = buttons[0], last = buttons.at(-1);
                if (!first) {
                    event.preventDefault();
                    return;
                }
                if (event.shiftKey && (document.activeElement === first || document.activeElement === node.current)) {
                    event.preventDefault();
                    last?.focus();
                }
                else if (!event.shiftKey && (document.activeElement === last || document.activeElement === node.current)) {
                    event.preventDefault();
                    first.focus();
                }
            }, children: [_jsxs("header", { className: "rf-frame-menu-heading", children: [_jsx("h2", { id: id, children: title }), onClose && _jsx("button", { type: "button", onClick: onClose, "aria-label": `Close ${title}`, children: "\u00D7" })] }), _jsx("div", { className: "rf-frame-menu-body", children: children }), footer && _jsx("footer", { className: "rf-frame-menu-footer", children: footer })] }) });
}
export function GameFrame({ children, friends, selectedFriendId, onSelectFriend, friendsLoading, friendsError, friendsEmptyMessage = "No playable Friends found.", friendsHiddenCount = 0, onConnect, wallet, confirmation, connection, walletActions, selectionMode = "picker", mode, onMenuChange }) {
    const [menu, setMenu] = useState(null);
    const friend = friends.find(value => value.id === selectedFriendId);
    const selecting = selectionMode === "picker" && (!friend || menu === "friends");
    const menuOpen = selecting || menu === "wallet" || Boolean(confirmation);
    useEffect(() => { onMenuChange?.(menuOpen); }, [menuOpen, onMenuChange]);
    return _jsxs("section", { className: "rf-game-frame", "aria-label": "Game container", "data-mode": mode, children: [_jsxs("div", { className: "rf-frame-chrome", inert: menuOpen || undefined, children: [_jsxs("div", { className: "rf-frame-toolbar", children: [_jsx("span", { className: "rf-frame-mode", children: mode === "preview" ? "Local preview" : "Live · Robinhood" }), selectionMode === "host" ? _jsx("span", { className: "rf-frame-selected-friend", children: friend?.label ?? "Choose a Friend" })
                                : _jsx("button", { type: "button", onClick: () => setMenu("friends"), "aria-label": "Choose Friend", children: friend?.label ?? "Choose Friend" }), _jsx("button", { type: "button", onClick: () => setMenu("wallet"), disabled: !friend, "aria-label": "Open Friend wallet", children: "Friend wallet" })] }), _jsx("div", { className: "rf-frame-viewport", children: children })] }), confirmation ? _jsxs(GameMenu, { title: confirmation.title, onClose: confirmation.busy ? undefined : confirmation.onCancel, footer: _jsxs(_Fragment, { children: [_jsx("button", { type: "button", disabled: confirmation.busy, onClick: confirmation.onCancel, children: "Cancel" }), _jsx("button", { type: "button", className: "rf-frame-primary", disabled: confirmation.busy, onClick: confirmation.onConfirm, children: confirmation.busy ? "Waiting…" : mode === "preview" ? "Confirm preview" : "Confirm" })] }), children: [_jsx("p", { children: confirmation.description }), confirmation.amount !== undefined && _jsx("p", { children: _jsxs("strong", { children: [formatGameAmount(confirmation.amount, 18), " RF"] }) }), confirmation.notice && _jsx("p", { children: confirmation.notice }), _jsx("p", { children: friend?.label }), _jsx("p", { className: "rf-frame-note", children: mode === "preview" ? "Simulated RF. No transaction will be sent." : "This action uses the selected Friend’s canonical wallet. A result is confirmed only after its receipt." }), confirmation.error && _jsx("p", { role: "alert", children: confirmation.error })] }) : selecting ? _jsxs(GameMenu, { title: "Choose your Friend", onClose: friend ? () => setMenu(null) : undefined, children: [_jsx("p", { children: mode === "preview" ? !friends.some(value => value.kind === "sample") ? "Choose your Friend for this local preview. Balances, items and outcomes are simulated." : "Choose a sample Friend. Each has separate simulated balances and items." : "Choose an owned, hardwired Generations NFT. Its inventory and RF stay with its wallet." }), connection, friendsLoading && _jsx("p", { role: "status", children: "Loading your Friends\u2026" }), friendsError && _jsx("p", { role: "alert", children: friendsError }), _jsx("div", { className: "rf-frame-friends", children: friends.map(value => _jsxs("button", { type: "button", "aria-pressed": value.id === selectedFriendId, onClick: () => { onSelectFriend?.(value.id); setMenu(null); }, children: [_jsx("strong", { children: value.label }), _jsx("small", { children: value.kind === "sample" ? "Sample · no ownership claim" : "Hardwired Generations" })] }, value.id.toString())) }), !friendsLoading && !friendsError && friendsHiddenCount > 0 && _jsxs("p", { children: [friendsHiddenCount, " ", friendsHiddenCount === 1 ? "Friend" : "Friends", " hidden: not hardwired (generation 0). Playing requires generation 1 or higher."] }), !friendsLoading && !friendsError && !friends.length && friendsEmptyMessage && _jsx("p", { children: friendsEmptyMessage }), onConnect && _jsx("button", { type: "button", className: "rf-frame-primary", onClick: onConnect, children: "Connect wallet" })] }) : menu === "wallet" ? _jsxs(GameMenu, { title: "Friend wallet", onClose: () => setMenu(null), children: [_jsx("h3", { children: friend?.label }), _jsx("p", { children: mode === "preview" ? "Preview balance. RF is simulated and no transactions are sent." : "Items and RF belong to this Friend’s canonical wallet." }), friend?.walletAddress && _jsx("p", { className: "rf-frame-address", children: friend.walletAddress }), wallet?.status === "loading" ? _jsx("p", { role: "status", children: "Loading RF balance\u2026" }) : wallet?.balance !== undefined ? _jsxs("p", { className: "rf-frame-wallet-balance", children: [formatGameAmount(wallet.balance, 18), " RF"] }) : _jsx("p", { children: "RF balance unavailable." }), wallet?.error && _jsx("p", { role: "alert", children: wallet.error }), walletActions, selectionMode === "picker" && _jsx("button", { type: "button", onClick: () => setMenu("friends"), children: "Change Friend" })] }) : null] });
}
