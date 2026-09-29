/**
 * Procedural FriendSDK cues. No recordings, downloads, music loop or game state.
 * The rounded tone and soft-tick formulas adapt the latest local Stats trailer
 * (2026-09-17), retaining the Make Friends trailer's earlier mint/pickup motifs.
 * Exact source hashes and adaptation notes live in sound-provenance.json.
 */
export declare const FRIEND_SOUND_IDS: readonly ["select", "purchase", "action-start", "action-ready", "anticipation", "impact", "reveal-common", "reveal-rare", "reveal-legendary", "reward"];
export type FriendSoundCue = typeof FRIEND_SOUND_IDS[number];
export declare const FRIEND_SOUND_SAMPLE_RATE = 48000;
export declare const FRIEND_SOUND_MAX_VOICES = 4;
export declare const FRIEND_SOUND_MAX_GAIN = 0.3;
export declare const FRIEND_SOUND_PEAK = 0.7;
export declare const FRIEND_SOUND_CUES: Readonly<Record<FriendSoundCue, Readonly<{
    label: string;
    duration: number;
    motif: string;
}>>>;
/** Pure mono PCM, suitable for AudioBuffer or a 16-bit WAV encoder. Always deterministic; never accesses browser APIs. */
export declare function renderFriendSound(cue: FriendSoundCue, options?: {
    sampleRate?: number;
}): Float32Array;
export type FriendSoundState = Readonly<{
    status: "locked" | "ready" | "unsupported" | "disposed";
    muted: boolean;
    volume: number;
    activeVoices: number;
}>;
export type FriendSoundKit = Readonly<{
    readonly state: FriendSoundState;
    /** Call directly within a user gesture. No cue is queued during unlocking. */
    unlock(): Promise<boolean>;
    /** Returns false while locked, muted, hidden, unavailable or disposed. */
    play(cue: FriendSoundCue, options?: {
        volume?: number;
        delay?: number;
    }): boolean;
    stop(): void;
    dispose(): void;
    setMuted(muted: boolean): void;
    setVolume(volume: number): void;
}>;
/**
 * Lazy Web Audio controller. Constructing this object is safe during SSR and
 * allocates no AudioContext. No pending unlock or delayed cue survives stop,
 * mute, document hiding or disposal. The oldest voice is stolen at four cues.
 */
export declare function createFriendSoundKit(options?: {
    muted?: boolean;
    volume?: number;
}): FriendSoundKit;
