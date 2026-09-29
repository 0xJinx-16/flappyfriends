export const DEVELOPMENT_MODE = true;

export const ECONOMY_CONFIG = Object.freeze({
  developmentMode: true,
  entryBurn: 100,
  reward: Object.freeze({
    maxPerRun: 250,
    dailyCap: 1000,
    minimumClaim: 5,
    allocation: Object.freeze({ burn: 0.60, rewards: 0.30, treasury: 0.10 }),
  }),
  claim: Object.freeze({
    minReward: 5,
    maxClaimPerRun: 250,
  }),
});

export function toDisplayAmount(value) {
  const safe = Number.isFinite(value) ? value : 0;
  if (safe === 0) return '0';
  return Number(safe.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 2 });
}

export function clampDailyReward(value, dailyCap = ECONOMY_CONFIG.reward.dailyCap) {
  const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;
  return Math.min(safeValue, Math.max(0, dailyCap));
}

export function calculateRunReward(pipesPassed) {
  const safePipes = Number.isFinite(pipesPassed) ? Math.max(0, Math.floor(pipesPassed)) : 0;
  if (safePipes <= 4) return 0;
  let reward;
  if (safePipes <= 10) {
    reward = 1.6 * safePipes + 1.5;
  } else if (safePipes <= 20) {
    reward = 12 + (safePipes - 10) * 1.8;
  } else if (safePipes <= 35) {
    reward = 30 + (safePipes - 20) * 1.4;
  } else if (safePipes <= 60) {
    reward = 60 + (safePipes - 35) * 1.1;
  } else {
    reward = 100 + (safePipes - 60) * 0.75;
  }

  const limited = Math.min(reward, ECONOMY_CONFIG.reward.maxPerRun);
  return Number(limited.toFixed(2));
}

export function validateRunResult({ pipesPassed, reward }) {
  const passCount = Number.isFinite(pipesPassed) ? Math.floor(pipesPassed) : NaN;
  const rewardValue = Number.isFinite(reward) ? reward : NaN;

  if (!Number.isInteger(passCount) || passCount < 0) {
    return { ok: false, error: 'invalid pipesPassed' };
  }
  if (!Number.isFinite(rewardValue) || rewardValue < 0) {
    return { ok: false, error: 'invalid reward' };
  }
  if (passCount > 0 && rewardValue === 0 && calculateRunReward(passCount) > 0) {
    return { ok: false, error: 'reward calculation mismatch' };
  }
  if (rewardValue > ECONOMY_CONFIG.reward.maxPerRun) {
    return { ok: false, error: 'reward exceeds max per run' };
  }
  if (passCount > 0 && rewardValue > calculateRunReward(passCount) + 0.01) {
    return { ok: false, error: 'reward above expected curve' };
  }
  return { ok: true, error: null };
}

export function evaluateDailyRemaining(walletAddress, runs) {
  const value = walletAddress ?? 'local-wallet';
  const now = Date.now();
  const totals = runs
    .filter((run) => run.walletAddress === value && run.runtimeStamp >= now - 86_400_000)
    .reduce((sum, run) => sum + Number(run.reward || 0), 0);
  return Math.max(0, ECONOMY_CONFIG.reward.dailyCap - totals);
}

export function createMockRewardProvider() {
  const runs = new Map();
  let nextRun = 1;

  return {
    async submitRun({ walletAddress, pipesPassed = 0, runtimeStamp = Date.now(), entryBurn = ECONOMY_CONFIG.entryBurn }) {
      if (!walletAddress || typeof walletAddress !== 'string') {
        return { runId: null, walletAddress: null, pipesPassed, reward: 0, entryBurn, runtimeStamp, claimState: 'failed', error: 'missing wallet address' };
      }

      const runId = `demo-run-${nextRun++}`;
      const created = {
        runId,
        walletAddress,
        pipesPassed,
        reward: 0,
        entryBurn,
        runtimeStamp,
        claimState: 'pending',
        error: null,
      };
      runs.set(runId, created);
      return { ...created };
    },

    async finalizeRun(runId, { walletAddress, pipesPassed, runtimeStamp = Date.now() }) {
      const run = runs.get(runId);
      if (!run) {
        return { runId, walletAddress, pipesPassed, reward: 0, claimState: 'failed', error: 'run not found' };
      }
      if (run.walletAddress !== walletAddress) {
        return { ...run, claimState: 'failed', error: 'wallet mismatch' };
      }

      const totalToday = Array.from(runs.values())
        .filter((value) => value.walletAddress === walletAddress && value.runtimeStamp >= runtimeStamp - 86_400_000 && value.reward > 0 && value.claimState !== 'failed')
        .reduce((sum, value) => sum + Number(value.reward || 0), 0);
      const rawReward = calculateRunReward(pipesPassed);
      const availableBudget = Math.max(0, ECONOMY_CONFIG.reward.dailyCap - totalToday);
      const cappedReward = availableBudget <= 0 ? 0 : Math.min(rawReward, availableBudget);
      const valid = validateRunResult({ pipesPassed, reward: cappedReward });
      if (!valid.ok) {
        return { ...run, pipesPassed, reward: 0, claimState: 'pending', error: valid.error };
      }

      const finalRun = {
        ...run,
        pipesPassed,
        runtimeStamp,
        reward: cappedReward,
        claimState: cappedReward > 0 ? 'pending' : 'pending',
        error: availableBudget <= 0 ? 'daily reward cap reached' : null,
      };
      runs.set(runId, finalRun);
      return { ...finalRun };
    },

    async claimReward(runId, walletAddress) {
      const run = runs.get(runId);
      if (!run) {
        return { runId, walletAddress, reward: 0, claimState: 'failed', error: 'run not found' };
      }
      if (run.walletAddress !== walletAddress) {
        return { ...run, reward: run.reward, claimState: 'failed', error: 'wallet mismatch' };
      }
      if (run.claimState === 'claimed') {
        return { ...run, reward: run.reward, claimState: 'claimed', error: 'reward already claimed' };
      }
      if (run.reward <= 0) {
        const completed = { ...run, claimState: 'pending', reward: 0, error: 'nothing to claim' };
        runs.set(runId, completed);
        return { ...completed };
      }

      const finalRun = { ...run, claimState: 'claimed', error: null };
      runs.set(runId, finalRun);
      return { ...finalRun };
    },

    async getDailyReward(walletAddress, now = Date.now()) {
      const earned = Array.from(runs.values())
        .filter((run) => run.walletAddress === walletAddress && run.runtimeStamp >= now - 86_400_000)
        .reduce((sum, run) => sum + Number(run.reward || 0), 0);
      return { earned: Number(earned.toFixed(2)), cap: ECONOMY_CONFIG.reward.dailyCap, remaining: Math.max(0, ECONOMY_CONFIG.reward.dailyCap - earned) };
    },

    listRuns() {
      return Array.from(runs.values());
    },
  };
}
