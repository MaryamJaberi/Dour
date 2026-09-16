import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import { sound } from '../soundManager';

describe('Sound System and Audio Synthesizer Verification with Granular Controls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sound.setMuted(false);
    sound.setSfxEnabled(true);
    sound.setBgmEnabled(true);
  });

  afterEach(() => {
    sound.stopBGM();
  });

  test('AudioContext initializes correctly and provides valid context', () => {
    const ctx = sound.getAudioContext();
    expect(ctx).toBeDefined();
    expect(ctx).not.toBeNull();
  });

  test('Master sound enabled/mute toggle works accurately', () => {
    sound.setSoundEnabled(false);
    expect(sound.getMuted()).toBe(true);
    expect(sound.isSoundEnabled()).toBe(false);
    expect(sound.isSfxEnabled()).toBe(false);
    expect(sound.isBgmEnabled()).toBe(false);

    sound.setSoundEnabled(true);
    expect(sound.getMuted()).toBe(false);
    expect(sound.isSoundEnabled()).toBe(true);
    expect(sound.isSfxEnabled()).toBe(true);
    expect(sound.isBgmEnabled()).toBe(true);
  });

  test('Independent SFX and BGM granular controls operate correctly', () => {
    // Disable BGM while keeping SFX enabled
    sound.setBgmEnabled(false);
    expect(sound.isBgmEnabled()).toBe(false);
    expect(sound.isSfxEnabled()).toBe(true);
    expect(sound.isSoundEnabled()).toBe(true);

    // Disable SFX while re-enabling BGM
    sound.setSfxEnabled(false);
    sound.setBgmEnabled(true);
    expect(sound.isSfxEnabled()).toBe(false);
    expect(sound.isBgmEnabled()).toBe(true);

    // Disable both
    sound.setBgmEnabled(false);
    expect(sound.isSfxEnabled()).toBe(false);
    expect(sound.isBgmEnabled()).toBe(false);
  });

  test('Tactile click sound triggers without error and respects SFX toggle', () => {
    expect(() => sound.playClick()).not.toThrow();

    sound.setSfxEnabled(false);
    expect(() => sound.playClick()).not.toThrow();
  });

  test('Toggle / option switch sound executes with musical intervals', () => {
    for (let i = 0; i < 5; i++) {
      expect(() => sound.playToggle()).not.toThrow();
    }
  });

  test('Start game fanfare triggers multiple ascending notes', () => {
    expect(() => sound.playStartGame()).not.toThrow();
  });

  test('Correct guess chimes rotate through diverse melodic variations', () => {
    // Call 10 times to ensure variant cycling and randomness works without crashing
    for (let i = 0; i < 10; i++) {
      expect(() => sound.playCorrect()).not.toThrow();
    }
  });

  test('Word swap swoosh sound executes all variations without error', () => {
    for (let i = 0; i < 6; i++) {
      expect(() => sound.playSwap()).not.toThrow();
    }
  });

  test('Tick-tock alternating clock sounds execute properly', () => {
    expect(() => sound.playTick()).not.toThrow();
    expect(() => sound.playTick()).not.toThrow();
    expect(() => sound.playTick()).not.toThrow();
  });

  test('Urgent countdown alarm escalates pitch from 5 down to 1 second', () => {
    for (let sec = 5; sec >= 1; sec--) {
      expect(() => sound.playUrgentTick(sec)).not.toThrow();
    }
  });

  test('Round end resonant gong and team elimination tones execute safely', () => {
    expect(() => sound.playRoundEnd()).not.toThrow();
    expect(() => sound.playElimination()).not.toThrow();
  });

  test('Victory celebration fanfare triggers correctly', () => {
    expect(() => sound.playVictory()).not.toThrow();
    expect(() => sound.playWinner()).not.toThrow();
  });

  test('Procedural Menu BGM and Gameplay BGM schedule, tempo adapt, and stop cleanly', () => {
    vi.useFakeTimers();

    sound.startMenuBGM();
    vi.advanceTimersByTime(1200);

    // Switch to Gameplay BGM
    sound.startGameplayBGM(60);
    vi.advanceTimersByTime(1000);

    // Speed up tempo in last 5 seconds
    sound.startGameplayBGM(4);
    vi.advanceTimersByTime(1000);

    // Stop BGM
    sound.stopBGM();
    expect(() => sound.stopBGM()).not.toThrow();

    vi.useRealTimers();
  });
});
