"use client";
"use client";

// examples/embedded/index.tsx
import { ConnectedGameHost } from "@rarefriends/friendsdk/runtime";
import { parseChanceGame } from "@rarefriends/friendsdk/game";

// examples/fishing/game.json
var game_default = {
  name: "Rare Friends: Fishing",
  consumable: "Bait",
  price: "1000000000000000000",
  outcomes: [
    { name: "Old Boot", chanceBps: 1500, reward: "0" },
    { name: "Sardine", chanceBps: 3e3, reward: "250000000000000000" },
    { name: "Sunfish", chanceBps: 2200, reward: "500000000000000000" },
    { name: "Bream", chanceBps: 1400, reward: "750000000000000000" },
    { name: "Rainbow Trout", chanceBps: 900, reward: "1500000000000000000" },
    { name: "Catfish", chanceBps: 500, reward: "2500000000000000000" },
    { name: "Sturgeon", chanceBps: 300, reward: "5000000000000000000" },
    { name: "Legend", chanceBps: 200, reward: "10000000000000000000" }
  ]
};

// examples/embedded/index.tsx
import "@rarefriends/friendsdk/frame.css";
import "@rarefriends/friendsdk/runtime.css";
import { jsx } from "react/jsx-runtime";
var fishing = parseChanceGame(game_default);
function EmbeddedFishingPreview(props) {
  return /* @__PURE__ */ jsx(ConnectedGameHost, { ...props, definition: fishing });
}
export {
  EmbeddedFishingPreview
};
