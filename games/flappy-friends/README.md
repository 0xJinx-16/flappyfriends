# Flappy Friends

Flappy Friends is a score-based pixel-art arcade game built for FriendSDK
**v0.1.3**. The selected Rare Friends Generations NFT is the flying character.
A collision with a pipe, the top boundary or the ground ends the run. Pipe
spacing stays fixed while speed and gap width increase gradually to bounded
limits. The pipe sequence is deterministic for a chosen Friend ID.

## Controls

- Tap the playfield on Android or click on desktop to flap.
- Press Space or Arrow Up to flap.
- Use Pause and Resume to stop and continue a run.
- Use the in-game overlay to pay the entry burn and start each run.
- Sound starts muted; use Sound on/off to control the synthesized effects.
- Enable Motion to honor the system reduced-motion preference and stop decorative motion.

The sandbox prevents browser scrolling during play. The game is responsive in a
portrait frame and renders the selected Friend's canonical SDK Generations
sprite frames. The runtime still requires a connected wallet on Robinhood
mainnet (chain 4663) whose selected, hardwired Generation NFT is eligible.

## Demo economy

This prototype intentionally runs in a `DEMO ECONOMY` mode. It does not submit a
live `$RAREFRIENDS` transfer, token claim, or blockchain transaction. The game
uses a capped simulation provider that mirrors the intended flow:

1. Pay a local entry burn of 100 RF before a run begins.
2. Score pipes to earn RF during the current session.
3. Finish a run and claim a pending reward in the same UI.
4. Stop reward accrual once the daily cap is reached.

The reward curve is configured centrally in `games/flappy-friends/economy.mjs` and
uses a diminishing-return function with a hard per-run cap of 250 RF and a daily
cap of 1000 RF. The local model is explicitly separate from any real blockchain
implementation; a production integration would require a verified $RAREFRIENDS
contract, wallet signer flow, and trusted server or on-chain enforcement for the
entry burn, daily cap, and claim state.

The UI intentionally describes this as a simulated in-game reward and never
mistakes a local reward for a confirmed wallet balance.

## Identity and asset source

The game component receives the runtime-verified `friendId` through
`GameComponentProps`, then calls `createFriendReader().read(friendId)` from the
SDK `sprites` export. It waits for both the initial game-session read and the
matching token's cached, chain-validated sprite frames before enabling play.
Artwork errors show a retry state; a changed or disconnected Friend does not
retain the previous character. The SDK exposes these canonical sprite frames, not
a full NFT marketplace portrait or `tokenURI`.

Artwork source: canonical Rare Friends Generations sprite frames via the SDK's
`@rarefriends/friendsdk/sprites` export; canvas rendering and flight tilt are
local presentation only.
Audio source: synthesized SDK sound kit, FriendSDK v0.1.3.

## Run and verify

From the FriendSDK repository root:

```sh
npm ci
npm run dev:game -- games/flappy-friends
npm run build
npm run check:games
node --test tests/flappy-friends-economy.test.mjs
```

The local runner prints its URL, normally `http://localhost:4173`.
