import { type GameFriend } from "./game-frame.js";
import { type ChanceGameDefinition } from "./game.js";
import { type LiveGameDeployment } from "./live-game.js";
import type { ChanceWalletClient } from "./chain.js";
import { type GenerationIdentityClient } from "./identity.js";
import { type OwnedFriendsClient } from "./owned-friends.js";
import { type FriendWalletProvider } from "./wallet.js";
export type GameHostProps = {
    definition: ChanceGameDefinition;
    frameUrl: string;
    /** Explicit live deployment; omit for simulated gameplay. */
    deployment?: LiveGameDeployment;
    /** Optional browser wallet already used by this project. */
    walletProvider?: FriendWalletProvider;
    /** Optional read-only RPC override. The public default needs no API key. */
    publicClient?: OwnedFriendsClient;
};
/** Complete game runtime: connection, owned Friends, verification, frame and confirmations. */
export declare function GameHost({ walletProvider, publicClient, ...props }: GameHostProps): import("react/jsx-runtime").JSX.Element;
export type ConnectedGameHostProps = {
    definition: ChanceGameDefinition;
    /** Optional integration with connection and selection already available in this project. */
    selectedFriend: GameFriend | null;
    account: string | null;
    chainId: number | null;
    /** Read-only client; ownership is checked by the SDK before play. */
    publicClient: GenerationIdentityClient | null;
    /** URL of the game document rendered through GameSession. */
    frameUrl: string;
    /** Change when a supplied connection invalidates identity. */
    revision?: number;
    deployment?: LiveGameDeployment;
    /** Required only when a deployment is supplied. Stays in the trusted runtime. */
    walletClient?: ChanceWalletClient;
    assertActive?: () => void;
};
/** SDK frame for a project that already supplies connection and selection. */
export declare function ConnectedGameHost(props: ConnectedGameHostProps): import("react/jsx-runtime").JSX.Element;
