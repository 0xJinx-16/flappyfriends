"use client";

import { useEffect, useRef, useState } from "react";
import type { GameComponentProps } from "@rarefriends/friendsdk/runtime";
import { createFriendReader, spriteFrame, type GenerationSprites } from "@rarefriends/friendsdk/sprites";
import { createFriendSoundKit, type FriendSoundKit } from "@rarefriends/friendsdk/sounds";
import { DEVELOPMENT_MODE, ECONOMY_CONFIG, calculateRunReward, createMockRewardProvider, toDisplayAmount } from "./economy.mjs";
import "./style.css";

const WIDTH = 360;
const HEIGHT = 480;
const GROUND_Y = 432;
const BIRD_X = 104;
const PIPE_WIDTH = 56;
const BIRD_RADIUS = 11;
const SPRITE_SCALE = 2;
const GAP_START = 152;
const PIPE_SPACING = 228;
type GameMode = "ready" | "playing" | "over";
type Pipe = { x: number; gapY: number; passed: boolean };
type Scene = { mode: GameMode; birdY: number; velocity: number; pipes: Pipe[]; score: number; distance: number; time: number; seed: number };
type ClaimState = "pending" | "claimed" | "failed";

type RunSummary = { earned: number; cap: number; remaining: number };

function createScene(seed: number): Scene {
  return { mode: "ready", birdY: 218, velocity: 0, pipes: [], score: 0, distance: 0, time: 0, seed: seed || 0x6d2b79f5 };
}

function random(scene: Scene): number {
  let value = scene.seed;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  scene.seed = value >>> 0;
  return scene.seed / 0x100000000;
}

function drawCloud(context: CanvasRenderingContext2D, x: number, y: number) {
  context.fillStyle = "#ffffff";
  context.fillRect(x + 8, y, 28, 8);
  context.fillRect(x, y + 8, 48, 12);
  context.fillRect(x + 8, y + 20, 32, 4);
  context.fillStyle = "#c9f2f5";
  context.fillRect(x + 8, y + 20, 8, 4);
}

function drawPipe(context: CanvasRenderingContext2D, pipe: Pipe, gap: number) {
  const openingTop = pipe.gapY - gap / 2;
  const openingBottom = pipe.gapY + gap / 2;
  const drawSegment = (top: number, bottom: number, capAtBottom: boolean) => {
    const left = Math.round(pipe.x);
    const right = left + PIPE_WIDTH;
    context.fillStyle = "#176c38";
    context.fillRect(left, top, PIPE_WIDTH, bottom - top);
    context.fillStyle = "#42b94e";
    context.fillRect(left + 5, top, PIPE_WIDTH - 10, bottom - top);
    context.fillStyle = "#83dc59";
    context.fillRect(left + 10, top, 8, bottom - top);
    context.fillStyle = "#155b32";
    context.fillRect(left + PIPE_WIDTH - 9, top, 4, bottom - top);
    const capTop = capAtBottom ? bottom - 23 : top;
    context.fillStyle = "#176c38";
    context.fillRect(left - 7, capTop, PIPE_WIDTH + 14, 23);
    context.fillStyle = "#55c64d";
    context.fillRect(left - 3, capTop + 4, PIPE_WIDTH + 6, 14);
    context.fillStyle = "#8de55b";
    context.fillRect(left + 3, capTop + 4, 8, 14);
    context.fillStyle = "#155b32";
    context.fillRect(right + 3, capTop + 4, 4, 14);
  };
  drawSegment(0, openingTop, true);
  drawSegment(openingBottom, GROUND_Y, false);
}

function drawFriend(context: CanvasRenderingContext2D, scene: Scene, sprites: GenerationSprites, reducedMotion: boolean) {
  const walking = scene.mode === "playing" && !reducedMotion;
  const frame = reducedMotion ? 0 : Math.floor(scene.time * 12) % 8;
  const rows = spriteFrame(sprites, "right", walking, frame).frame.rows;
  const tilt = scene.mode === "playing" ? Math.max(-0.32, Math.min(0.35, scene.velocity / 900)) : 0;
  context.save();
  context.translate(BIRD_X, scene.birdY);
  context.rotate(tilt);
  context.imageSmoothingEnabled = false;
  const spriteLeft = -SPRITE_SCALE * 8;
  const spriteTop = -SPRITE_SCALE * 8;
  context.fillStyle = "#fff";
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === "#") context.fillRect(spriteLeft + x * SPRITE_SCALE - SPRITE_SCALE, spriteTop + y * SPRITE_SCALE - SPRITE_SCALE,
        SPRITE_SCALE * 3, SPRITE_SCALE * 3);
    }
  }
  context.fillStyle = "#111";
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === "#") context.fillRect(spriteLeft + x * SPRITE_SCALE, spriteTop + y * SPRITE_SCALE, SPRITE_SCALE, SPRITE_SCALE);
    }
  }
  context.restore();
}

function drawScene(context: CanvasRenderingContext2D, scene: Scene, sprites: GenerationSprites | null, reducedMotion: boolean) {
  context.imageSmoothingEnabled = false;
  context.fillStyle = "#75d9ed";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = "#fff0a5";
  context.fillRect(282, 48, 28, 28);
  context.fillRect(290, 40, 12, 44);
  context.fillRect(274, 56, 44, 12);
  const cloudShift = reducedMotion ? 0 : (scene.distance * 0.12) % 430;
  drawCloud(context, 36 - cloudShift, 96);
  drawCloud(context, 260 - cloudShift, 164);
  drawCloud(context, 454 - cloudShift, 70);
  context.fillStyle = "#9ce6d8";
  context.fillRect(0, 374, WIDTH, 16);
  context.fillRect(24, 363, 68, 11);
  context.fillRect(208, 358, 84, 16);
  context.fillStyle = "#75cdbd";
  context.fillRect(0, 390, WIDTH, 14);
  const speed = 142 + Math.min(scene.score, 18) * 4;
  const gap = Math.max(126, GAP_START - Math.min(scene.score, 13) * 2);
  for (const pipe of scene.pipes) drawPipe(context, pipe, gap);
  context.fillStyle = "#438b42";
  context.fillRect(0, GROUND_Y, WIDTH, HEIGHT - GROUND_Y);
  context.fillStyle = "#9ad94d";
  context.fillRect(0, GROUND_Y, WIDTH, 8);
  context.fillStyle = "#e7c56d";
  context.fillRect(0, GROUND_Y + 8, WIDTH, HEIGHT - GROUND_Y - 8);
  context.fillStyle = "#b28a4f";
  const tileShift = reducedMotion ? 0 : Math.floor(scene.distance) % 32;
  for (let tileX = -32 - tileShift; tileX < WIDTH; tileX += 32) {
    context.fillRect(tileX, GROUND_Y + 8, 2, 40);
    context.fillRect(tileX + 16, GROUND_Y + 26, 16, 2);
  }
  context.fillStyle = "#fff2b9";
  context.fillRect(0, HEIGHT - 4, WIDTH, 4);
  if (sprites) drawFriend(context, scene, sprites, reducedMotion);
  if (scene.mode === "ready") {
    context.fillStyle = "rgba(16, 43, 59, 0.18)";
    context.fillRect(0, 0, WIDTH, HEIGHT);
  }
}

function advanceScene(scene: Scene, delta: number, onScore: (score: number) => void, onGameOver: () => void) {
  if (scene.mode !== "playing") return;
  scene.time += delta;
  const speed = 142 + Math.min(scene.score, 18) * 4;
  const gap = Math.max(126, GAP_START - Math.min(scene.score, 13) * 2);
  scene.velocity = Math.min(560, scene.velocity + 820 * delta);
  scene.birdY += scene.velocity * delta;
  scene.distance += speed * delta;
  if (scene.pipes.length === 0 || scene.pipes[scene.pipes.length - 1].x < WIDTH - PIPE_SPACING) {
    const minCenter = 70 + gap / 2;
    const maxCenter = GROUND_Y - 54 - gap / 2;
    scene.pipes.push({ x: WIDTH + 34, gapY: minCenter + random(scene) * (maxCenter - minCenter), passed: false });
  }
  for (const pipe of scene.pipes) {
    pipe.x -= speed * delta;
    if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X) {
      pipe.passed = true;
      scene.score += 1;
      onScore(scene.score);
    }
    const overlapsBird = BIRD_X + BIRD_RADIUS > pipe.x && BIRD_X - BIRD_RADIUS < pipe.x + PIPE_WIDTH;
    const gapTop = pipe.gapY - gap / 2;
    const gapBottom = pipe.gapY + gap / 2;
    if (overlapsBird && (scene.birdY - BIRD_RADIUS < gapTop || scene.birdY + BIRD_RADIUS > gapBottom)) {
      scene.mode = "over";
      onGameOver();
      return;
    }
  }
  scene.pipes = scene.pipes.filter(pipe => pipe.x > -PIPE_WIDTH - 16);
  if (scene.birdY < BIRD_RADIUS || scene.birdY + BIRD_RADIUS > GROUND_Y) {
    scene.mode = "over";
    onGameOver();
  }
}

/** The SDK supplies the selected, freshly verified Friend and the sandbox session client. */
export default function FlappyFriends({ friendId, client, paused }: GameComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spriteReader] = useState(() => createFriendReader());
  const sceneRef = useRef(createScene(Number(friendId % 2147483647n)));
  const rewardProviderRef = useRef(createMockRewardProvider());
  const runFinalizedRef = useRef(false);
  const spritesRef = useRef<GenerationSprites | null>(null);
  const soundRef = useRef<FriendSoundKit | null>(null);
  const pausedRef = useRef(paused);
  const manualPauseRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const mutedRef = useRef(true);
  const inputRef = useRef<() => void>(() => {});
  const [sprites, setSprites] = useState<GenerationSprites | null>(null);
  const [loadedFriend, setLoadedFriend] = useState<bigint | null>(null);
  const [loadError, setLoadError] = useState("");
  const [artworkAttempt, setArtworkAttempt] = useState(0);
  const [mode, setMode] = useState<GameMode>("ready");
  const [score, setScore] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [entryState, setEntryState] = useState<"required" | "confirming" | "confirmed" | "failed" | "claimed">("required");
  const [rewardState, setRewardState] = useState<ClaimState>("pending");
  const [runId, setRunId] = useState<string | null>(null);
  const [pendingReward, setPendingReward] = useState(0);
  const [claimedReward, setClaimedReward] = useState(0);
  const [dailySummary, setDailySummary] = useState<RunSummary>({ earned: 0, cap: ECONOMY_CONFIG.reward.dailyCap, remaining: ECONOMY_CONFIG.reward.dailyCap });
  const [economyMessage, setEconomyMessage] = useState("");
  const walletAddress = `demo-wallet-${friendId.toString()}`;
  const currentReward = calculateRunReward(score);
  const rewardDisplay = toDisplayAmount(currentReward);

  pausedRef.current = paused;
  manualPauseRef.current = manualPaused;
  reducedMotionRef.current = reducedMotion;
  mutedRef.current = muted;
  spritesRef.current = sprites?.tokenId === friendId ? sprites : null;

  const refreshDailySummary = async () => {
    const nextSummary = await rewardProviderRef.current.getDailyReward(walletAddress);
    setDailySummary({ earned: nextSummary.earned, cap: nextSummary.cap, remaining: nextSummary.remaining });
  };

  useEffect(() => {
    let active = true;
    setLoadedFriend(null);
    setSprites(null);
    setLoadError("");
    sceneRef.current = createScene(Number(friendId % 2147483647n));
    setMode("ready");
    setScore(0);
    setPendingReward(0);
    setClaimedReward(0);
    setRewardState("pending");
    setEntryState("required");
    setRunId(null);
    runFinalizedRef.current = false;
    setManualPaused(false);
    manualPauseRef.current = false;
    soundRef.current?.dispose();
    soundRef.current = createFriendSoundKit({ muted: true });
    void Promise.all([client.read(), spriteReader.read(friendId)]).then(([snapshot, friendSprites]) => {
      if (!active) return;
      if (snapshot.friendId !== friendId || friendSprites.tokenId !== friendId) {
        setLoadError("This session does not match the selected Friend.");
        return;
      }
      setLoadedFriend(snapshot.friendId);
      setSprites(friendSprites);
    }).catch(error => {
      if (active) setLoadError(error instanceof Error
        ? `Could not load your Friend or its artwork. ${error.message}`
        : "Could not load your Friend or its artwork. Check your connection and retry.");
    });
    void refreshDailySummary();
    return () => {
      active = false;
      soundRef.current?.dispose();
      soundRef.current = null;
    };
  }, [client, friendId, spriteReader, artworkAttempt]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    let previousTime = 0;
    const render = (timestamp: number) => {
      const scene = sceneRef.current;
      if (previousTime && !pausedRef.current && !manualPauseRef.current) {
        advanceScene(scene, Math.min((timestamp - previousTime) / 1000, 0.034),
          nextScore => setScore(nextScore),
          () => {
            setMode("over");
            if (!mutedRef.current) soundRef.current?.play("impact");
          });
        if (!pausedRef.current && !manualPauseRef.current) setMode(scene.mode);
      }
      previousTime = timestamp;
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (context) drawScene(context, scene, spritesRef.current, reducedMotionRef.current);
      animationFrame = window.requestAnimationFrame(render);
    };
    animationFrame = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [friendId]);

  const finalizeCurrentRun = async () => {
    if (!runId || runFinalizedRef.current) return;
    runFinalizedRef.current = true;
    const finalized = await rewardProviderRef.current.finalizeRun(runId, {
      walletAddress,
      pipesPassed: score,
      runtimeStamp: Date.now(),
    });
    setPendingReward(finalized.reward);
    setRewardState(finalized.claimState === "claimed" ? "claimed" : "pending");
    setEconomyMessage(finalized.error ? finalized.error : "Reward ready to claim.");
    await refreshDailySummary();
  };

  const claimCurrentRun = async () => {
    if (!runId) return;
    const claimed = await rewardProviderRef.current.claimReward(runId, walletAddress);
    setRewardState(claimed.claimState ?? "failed");
    setClaimedReward(claimed.reward);
    setPendingReward(claimed.reward);
    setEconomyMessage(claimed.error ?? "Reward claimed.");
    await refreshDailySummary();
  };

  const beginDemoRun = async () => {
    if (entryState === "confirming") return;
    setEntryState("confirming");
    setEconomyMessage("");
    const entered = await rewardProviderRef.current.submitRun({
      walletAddress,
      pipesPassed: 0,
      runtimeStamp: Date.now(),
      entryBurn: ECONOMY_CONFIG.entryBurn,
    });
    if (!entered.runId || entered.error) {
      setEntryState("failed");
      setEconomyMessage(entered.error ?? "Entry failed.");
      return;
    }
    setRunId(entered.runId);
    setEntryState("confirmed");
    setRewardState("pending");
    setPendingReward(0);
    setClaimedReward(0);
    runFinalizedRef.current = false;
    sceneRef.current = createScene(Number(friendId % 2147483647n));
    setScore(0);
    setMode("ready");
    await refreshDailySummary();
    const scene = sceneRef.current;
    scene.mode = "playing";
    scene.velocity = -292;
    setMode("playing");
  };

  const flap = () => {
    if (pausedRef.current || manualPauseRef.current || loadError) return;
    if (entryState !== "confirmed") return;
    if (loadedFriend !== friendId || spritesRef.current?.tokenId !== friendId) return;
    const scene = sceneRef.current;
    if (scene.mode === "over") {
      runFinalizedRef.current = false;
      sceneRef.current = createScene(Number(friendId % 2147483647n));
      sceneRef.current.mode = "playing";
      sceneRef.current.velocity = -292;
      setScore(0);
      setMode("playing");
    } else {
      scene.mode = "playing";
      scene.velocity = -292;
      setMode("playing");
    }
    if (!mutedRef.current) {
      void (async () => {
        if (await soundRef.current?.unlock()) soundRef.current?.play("select");
      })();
    }
  };
  inputRef.current = flap;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space" && event.code !== "ArrowUp") return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("button, input, select, textarea")) return;
      event.preventDefault();
      inputRef.current();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (mode !== "over" || !runId || !entryState || entryState === "required") return;
    void finalizeCurrentRun();
  }, [mode, runId, entryState]);

  const retry = () => {
    setLoadError("");
    setLoadedFriend(null);
    setSprites(null);
    setArtworkAttempt(attempt => attempt + 1);
  };
  const togglePause = () => {
    if (mode !== "playing" && !manualPaused) return;
    setManualPaused(value => !value);
  };
  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    soundRef.current?.setMuted(nextMuted);
    if (!nextMuted) {
      void (async () => {
        if (await soundRef.current?.unlock()) soundRef.current?.play("select");
      })();
    }
  };
  const resetRound = () => {
    setPendingReward(0);
    setClaimedReward(0);
    setRewardState("pending");
    setRunId(null);
    setEntryState("required");
    setEconomyMessage("");
    sceneRef.current = createScene(Number(friendId % 2147483647n));
    setScore(0);
    setMode("ready");
    runFinalizedRef.current = false;
  };

  if (loadError || loadedFriend !== friendId || sprites?.tokenId !== friendId) {
    return <main className="flappy-game flappy-loading" role={loadError ? "alert" : "status"}>
      <div className="flappy-loading-card">
        <span className="flappy-kicker">FLAPPY FRIENDS</span>
        <h1>{loadError ? "Character unavailable" : "Loading your Friend"}</h1>
        <p>{loadError || "Loading the selected Friend's artwork…"}</p>
        {loadError && <button type="button" onClick={retry}>Retry</button>}
      </div>
    </main>;
  }

  const isPaused = paused || manualPaused;
  const showRewardClaim = mode === "over" && !isPaused && runId && pendingReward > 0 && rewardState === "pending";
  const displayedReward = finalRewardValue();

  function finalRewardValue() {
    if (rewardState === "claimed") return claimedReward || pendingReward || currentReward;
    if (pendingReward > 0) return pendingReward;
    return Math.max(0, currentReward);
  }

  return <main className="flappy-game" aria-label="Flappy Friends demo economy arcade game">
    <canvas
      ref={canvasRef}
      className="flappy-canvas"
      width={WIDTH}
      height={HEIGHT}
      aria-hidden="true"
      onPointerDown={event => { event.preventDefault(); flap(); }}
    />
    <header className="flappy-topbar">
      <div className="flappy-identity"><span className="flappy-mark" aria-hidden="true">FF</span><span>FRIEND #{friendId.toString()}</span></div>
      <div className="flappy-controls">
        <button type="button" onClick={toggleSound} aria-label={muted ? "Sound on" : "Sound off"}>{muted ? "Sound off" : "Sound on"}</button>
        <label className="flappy-motion"><input type="checkbox" checked={reducedMotion} onChange={event => setReducedMotion(event.target.checked)} /> Motion</label>
        <button type="button" onClick={togglePause} disabled={mode !== "playing" && !manualPaused}>{manualPaused ? "Resume" : "Pause"}</button>
      </div>
    </header>
    <div className="flappy-score" aria-live="polite" aria-label={`RF earned ${displayedReward}`}>
      <span>RF EARNED</span>
      <strong>+{toDisplayAmount(displayedReward)}</strong>
      <small>{score} PIPES</small>
    </div>
    <div className="flappy-economy" aria-live="polite">
      <span className="flappy-economy-badge">{DEVELOPMENT_MODE ? "DEMO ECONOMY" : "LIVE ECONOMY"}</span>
      <span>ENTRY {ECONOMY_CONFIG.entryBurn} RF</span>
      <span>DAILY {dailySummary.earned.toFixed(0)}/{dailySummary.cap}</span>
    </div>
    <div className="flappy-footer">
      <span className="flappy-rules">ARCADE RUN · SIMULATED RF</span>
      <span className="flappy-help">TAP / CLICK · SPACE · ARROW UP</span>
    </div>
    {mode === "ready" && entryState !== "confirmed" && <section className="flappy-overlay" aria-label="Start screen">
      <div className="flappy-panel flappy-intro">
        <span className="flappy-stamp">DEMO RF ECONOMY</span>
        <h1>FLAPPY<br />FRIENDS</h1>
        <p>Entry burn: {ECONOMY_CONFIG.entryBurn} RF. Reward is capped at {ECONOMY_CONFIG.reward.maxPerRun} RF per run.</p>
        <button type="button" className="flappy-primary" onClick={beginDemoRun}>Pay {ECONOMY_CONFIG.entryBurn} RF and start</button>
        {economyMessage && <small className="flappy-message">{economyMessage}</small>}
      </div>
    </section>}
    {isPaused && <section className="flappy-overlay" aria-label="Paused">
      <div className="flappy-panel"><span className="flappy-stamp">FLIGHT PAUSED</span><h2>Take a breath.</h2>
        {!paused && <button type="button" className="flappy-primary" onClick={togglePause}>Resume</button>}
      </div>
    </section>}
    {mode === "over" && !isPaused && <section className="flappy-overlay" aria-label="Game over">
      <div className="flappy-panel flappy-panel-reward">
        <span className="flappy-stamp">RUN COMPLETE</span>
        <h2>RF earned</h2>
        <p className="flappy-reward">+{toDisplayAmount(finalRewardValue())}</p>
        <div className="flappy-run-stats">
          <span>PIPES: {score}</span>
          <span>ENTRY: {ECONOMY_CONFIG.entryBurn} RF</span>
          <span>DAILY: {Math.round(dailySummary.earned)}/{dailySummary.cap}</span>
        </div>
        {rewardState === "pending" && pendingReward > 0 && <button type="button" className="flappy-primary" onClick={claimCurrentRun}>Claim reward</button>}
        {rewardState === "claimed" && <button type="button" className="flappy-primary" onClick={resetRound}>Play again</button>}
        {rewardState === "pending" && pendingReward === 0 && <button type="button" className="flappy-primary" onClick={resetRound}>Play again</button>}
        {economyMessage && <small className="flappy-message">{economyMessage}</small>}
      </div>
    </section>}
  </main>;
}
