"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { createFrameGameClient } from "./frame-bridge.js";
/** Game-side bridge. The runtime supplies one verified Friend and a fixed action client. */
export function GameSession({ definition, children }) {
    const [session, setSession] = useState(null);
    const [paused, setPaused] = useState(false);
    const [documentId] = useState(() => crypto.getRandomValues(new Uint32Array(4)).join("-"));
    useEffect(() => {
        let connection;
        const handshakeId = crypto.getRandomValues(new Uint32Array(4)).join("-");
        const ready = () => window.parent.postMessage({ type: "friendsdk:ready", documentId, handshakeId }, "*");
        const unloading = () => window.parent.postMessage({ type: "friendsdk:unloading", documentId, handshakeId }, "*");
        function receive(event) {
            if (event.source !== window.parent)
                return;
            if (event.data?.type === "friendsdk:connect") {
                ready();
                return;
            }
            if (connection || event.data?.type !== "friendsdk:init" ||
                event.data.documentId !== documentId || event.data.handshakeId !== handshakeId ||
                typeof event.data.friendId !== "bigint" || event.data.friendId < 1n || event.ports.length !== 1)
                return;
            connection = createFrameGameClient(event.ports[0], definition, setPaused, event.data.mode === "chain" ? "chain" : "preview");
            setSession({ friendId: event.data.friendId, client: connection.client });
        }
        window.addEventListener("message", receive);
        window.addEventListener("pagehide", unloading);
        ready();
        return () => {
            window.removeEventListener("message", receive);
            window.removeEventListener("pagehide", unloading);
            window.parent.postMessage({ type: "friendsdk:reset", documentId, handshakeId }, "*");
            connection?.close();
            setSession(null);
        };
    }, [definition, documentId]);
    return session ? children({ ...session, paused }) : _jsx("p", { role: "status", children: "Waiting for your Friend\u2026" });
}
