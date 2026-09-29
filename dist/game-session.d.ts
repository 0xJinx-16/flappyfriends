import { type ReactNode } from "react";
import type { ChanceGameDefinition, GameClient } from "./game.js";
export type GameComponentProps = Readonly<{
    friendId: bigint;
    client: GameClient;
    paused: boolean;
}>;
/** Game-side bridge. The runtime supplies one verified Friend and a fixed action client. */
export declare function GameSession({ definition, children }: {
    definition: ChanceGameDefinition;
    children: (props: GameComponentProps) => ReactNode;
}): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
