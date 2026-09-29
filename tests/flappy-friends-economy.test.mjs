import test from 'node:test';
import assert from 'node:assert/strict';

import { ECONOMY_CONFIG, calculateRunReward, clampDailyReward, createMockRewardProvider, validateRunResult } from '../games/flappy-friends/economy.mjs';

const rewardProvider = createMockRewardProvider();

test('reward curve respects configured caps and diminishing returns', () => {
  assert.equal(calculateRunReward(0), 0);
  assert.ok(calculateRunReward(5) > 0);
  assert.ok(calculateRunReward(20) < calculateRunReward(30));
  assert.ok(calculateRunReward(60) <= ECONOMY_CONFIG.reward.maxPerRun);
  assert.ok(calculateRunReward(500) <= ECONOMY_CONFIG.reward.maxPerRun);
});

test('daily reward cap clamps total earnings', () => {
  const capped = clampDailyReward(1200, 1000);
  assert.equal(capped, 1000);
  assert.equal(clampDailyReward(100, 1000), 100);
});

test('run validation rejects impossible values', () => {
  assert.equal(validateRunResult({ pipesPassed: -1, reward: 0 }).ok, false);
  assert.equal(validateRunResult({ pipesPassed: 10, reward: -1 }).ok, false);
  assert.equal(validateRunResult({ pipesPassed: 10, reward: 500 }).ok, false);
  assert.equal(validateRunResult({ pipesPassed: 10, reward: 12 }).ok, true);
});

test('mock provider tracks duplicate claims and daily cap', async () => {
  const provider = createMockRewardProvider();
  const submitted = await provider.submitRun({ walletAddress: '0xabc', pipesPassed: 8, runtimeStamp: Date.now() });
  assert.equal(submitted.claimState, 'pending');

  const finalized = await provider.finalizeRun(submitted.runId, { walletAddress: '0xabc', pipesPassed: 8, runtimeStamp: Date.now() + 1 });
  assert.equal(finalized.claimState, 'pending');
  assert.ok(finalized.reward > 0);

  const claimed = await provider.claimReward(submitted.runId, '0xabc');
  assert.equal(claimed.claimState, 'claimed');
  const duplicate = await provider.claimReward(submitted.runId, '0xabc');
  assert.equal(duplicate.claimState, 'claimed');
  assert.equal(duplicate.error, 'reward already claimed');

  const dailyCapRun = await provider.submitRun({ walletAddress: '0xdef', pipesPassed: 1000, runtimeStamp: Date.now() + 2 });
  const capped = await provider.finalizeRun(dailyCapRun.runId, { walletAddress: '0xdef', pipesPassed: 1000, runtimeStamp: Date.now() + 3 });
  assert.equal(capped.claimState, 'pending');
  assert.ok(capped.reward <= ECONOMY_CONFIG.reward.dailyCap);
  assert.ok(capped.reward >= 0);
});

const claimState = 'claimed';
assert.equal(claimState, 'claimed');
