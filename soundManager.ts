// Web Audio API Complete Dynamic Sound & Music Engine for DOUR Party Game
// Provides granular hierarchical control: Master Sound, In-Game SFX, and Background Music (BGM)
// Includes non-repetitive chimes, tactile clicks, organic clock ticks, and adaptive tempo gameplay BGM

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;

  // Granular sound state
  private isMasterMuted: boolean = false;
  private isSfxOn: boolean = true;
  private isBgmOn: boolean = true;

  // Background music state
  private currentBgmMode: 'none' | 'menu' | 'game' = 'none';
  private bgmTimeout: number | null = null;
  private bgmStep: number = 0;

  // Tracking last played variant to ensure consecutive sounds are never identical
  private lastCorrectVariant: number = -1;
  private lastSwapVariant: number = -1;
  private tickToggle: boolean = false;

  constructor() {
    this.loadPersistedPreferences();
    this.initAutoUnlock();
  }

  private loadPersistedPreferences() {
    if (typeof window === 'undefined') return;
    try {
      const savedMaster = localStorage.getItem('dor_sound_master');
      if (savedMaster !== null) {
        this.isMasterMuted = savedMaster === 'false';
      }
      const savedSfx = localStorage.getItem('dor_sound_sfx');
      if (savedSfx !== null) {
        this.isSfxOn = savedSfx === 'true';
      }
      const savedBgm = localStorage.getItem('dor_sound_bgm');
      if (savedBgm !== null) {
        this.isBgmOn = savedBgm === 'true';
      }
    } catch (e) {
      // Safe fallback
    }
  }

  private persistPreferences() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('dor_sound_master', (!this.isMasterMuted).toString());
      localStorage.setItem('dor_sound_sfx', this.isSfxOn.toString());
      localStorage.setItem('dor_sound_bgm', this.isBgmOn.toString());
    } catch (e) {}
  }

  private initAutoUnlock() {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      this.getAudioContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      if (!this.isMasterMuted && this.isBgmOn && this.currentBgmMode === 'none') {
        this.startMenuBGM();
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });

    // Handle background tab switching (visibilitychange)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.bgmTimeout) {
          window.clearTimeout(this.bgmTimeout);
          this.bgmTimeout = null;
        }
      } else {
        if (!this.isMasterMuted && this.isBgmOn) {
          if (this.currentBgmMode === 'menu') {
            this.scheduleNextMenuBeat();
          }
        }
      }
    });
  }

  public getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.setupGainNodes();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private setupGainNodes() {
    if (!this.ctx) return;
    try {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMasterMuted ? 0 : 1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.isSfxOn ? 0.85 : 0, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.isBgmOn ? 0.35 : 0, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);
    } catch (e) {}
  }

  private getSfxDestination(): AudioNode | null {
    const ctx = this.getAudioContext();
    if (!ctx) return null;
    if (!this.sfxGain) {
      this.setupGainNodes();
    }
    return this.sfxGain || ctx.destination;
  }

  private getBgmDestination(): AudioNode | null {
    const ctx = this.getAudioContext();
    if (!ctx) return null;
    if (!this.bgmGain) {
      this.setupGainNodes();
    }
    return this.bgmGain || ctx.destination;
  }

  // --- MASTER & GRANULAR SOUND CONTROLS ---

  /**
   * Master Mute / Sound Toggle
   */
  public setMuted(muted: boolean) {
    this.isMasterMuted = muted;
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setValueAtTime(muted ? 0 : 1.0, this.ctx.currentTime);
      } catch (e) {}
    }
    if (muted) {
      this.stopBGM();
    } else {
      if (this.isBgmOn && this.currentBgmMode === 'none') {
        this.startMenuBGM();
      }
    }
    this.persistPreferences();
  }

  public setSoundEnabled(enabled: boolean) {
    this.setMuted(!enabled);
  }

  public getMuted(): boolean {
    return this.isMasterMuted;
  }

  public isSoundEnabled(): boolean {
    return !this.isMasterMuted;
  }

  /**
   * SFX (In-Game Sound Effects) Control
   */
  public setSfxEnabled(enabled: boolean) {
    this.isSfxOn = enabled;
    if (this.sfxGain && this.ctx) {
      try {
        this.sfxGain.gain.setValueAtTime(enabled ? 0.85 : 0, this.ctx.currentTime);
      } catch (e) {}
    }
    this.persistPreferences();
  }

  public isSfxEnabled(): boolean {
    return this.isSfxOn && !this.isMasterMuted;
  }

  /**
   * BGM (Background Music) Control
   */
  public setBgmEnabled(enabled: boolean) {
    this.isBgmOn = enabled;
    if (this.bgmGain && this.ctx) {
      try {
        this.bgmGain.gain.setValueAtTime(enabled ? 0.35 : 0, this.ctx.currentTime);
      } catch (e) {}
    }
    if (!enabled) {
      this.stopBGM();
    } else if (!this.isMasterMuted && this.currentBgmMode === 'none') {
      this.startMenuBGM();
    }
    this.persistPreferences();
  }

  public isBgmEnabled(): boolean {
    return this.isBgmOn && !this.isMasterMuted;
  }

  public stopMenuBGM() {
    if (this.currentBgmMode === 'menu') {
      this.stopBGM();
    }
  }

  public playWinner() {
    this.playVictory();
  }

  // --- DYNAMIC NON-REPETITIVE SOUND EFFECTS ---

  // 1. UI Click with subtle random micro-pitch variation (tactile, organic click)
  public playClick() {
    if (this.isMasterMuted || !this.isSfxOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      // Slight pitch variation +/- 8% to avoid robotic repetition
      const baseFreq = 540 + (Math.random() * 80 - 40);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.035);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  // 2. Toggle / Tab switch / Select with harmonic variation
  public playToggle() {
    if (this.isMasterMuted || !this.isSfxOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      // 3 variations of cheerful toggle intervals
      const pairs = [
        [587.33, 880.00], // D5 -> A5
        [659.25, 987.77], // E5 -> B5
        [523.25, 783.99], // C5 -> G5
      ];
      const selected = pairs[Math.floor(Math.random() * pairs.length)];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(selected[0], now);
      osc.frequency.setValueAtTime(selected[1], now + 0.03);

      gain.gain.setValueAtTime(0.13, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch (e) {}
  }

  // 3. Start Game Fanfare
  public playStartGame() {
    if (this.isMasterMuted || !this.isSfxOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      const notes = [392.0, 523.25, 659.25, 783.99, 1046.5]; // G4, C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.20, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.22);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.22);
      });
    } catch (e) {}
  }

  // 4. Correct Guess Chime - 6 distinct melodic variations to avoid repetitive fatigue!
  public playCorrect() {
    if (this.isMasterMuted || !this.isSfxOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      
      // 6 distinct pleasant ascending melodic patterns
      const chimeVariants: Array<Array<{ f: number; d: number }>> = [
        // Variant 0: High Major Arpeggio (C5-E5-G5-C6)
        [
          { f: 523.25, d: 0.04 },
          { f: 659.25, d: 0.04 },
          { f: 783.99, d: 0.04 },
          { f: 1046.50, d: 0.16 }
        ],
        // Variant 1: Pentatonic Sparkle (F5-A5-C6-E6)
        [
          { f: 698.46, d: 0.035 },
          { f: 880.00, d: 0.035 },
          { f: 1046.50, d: 0.04 },
          { f: 1318.51, d: 0.18 }
        ],
        // Variant 2: Warm Kalimba Triad (G4-D5-G5-B5)
        [
          { f: 392.00, d: 0.04 },
          { f: 587.33, d: 0.04 },
          { f: 783.99, d: 0.05 },
          { f: 987.77, d: 0.16 }
        ],
        // Variant 3: Double Bounce Chord (E5-G5-A5-D6)
        [
          { f: 659.25, d: 0.03 },
          { f: 783.99, d: 0.03 },
          { f: 880.00, d: 0.04 },
          { f: 1174.66, d: 0.18 }
        ],
        // Variant 4: Glissando Cascade (D5-F#5-A5-C#6)
        [
          { f: 587.33, d: 0.035 },
          { f: 739.99, d: 0.035 },
          { f: 880.00, d: 0.04 },
          { f: 1108.73, d: 0.17 }
        ],
        // Variant 5: Golden Fanfare (A4-C#5-E5-A5-E6)
        [
          { f: 440.00, d: 0.03 },
          { f: 554.37, d: 0.03 },
          { f: 659.25, d: 0.03 },
          { f: 880.00, d: 0.05 },
          { f: 1318.51, d: 0.18 }
        ]
      ];

      // Pick a different variant than the immediately preceding one
      let chosenIdx = Math.floor(Math.random() * chimeVariants.length);
      if (chosenIdx === this.lastCorrectVariant) {
        chosenIdx = (chosenIdx + 1) % chimeVariants.length;
      }
      this.lastCorrectVariant = chosenIdx;

      const pattern = chimeVariants[chosenIdx];
      let offset = 0;

      pattern.forEach(({ f, d }, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Pleasant bell-like mix (triangle + soft harmonics)
        osc.type = idx === pattern.length - 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now + offset);

        const volume = idx === pattern.length - 1 ? 0.24 : 0.16;
        gain.gain.setValueAtTime(volume, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + d + 0.12);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(now + offset);
        osc.stop(now + offset + d + 0.12);

        offset += d;
      });
    } catch (e) {}
  }

  // 5. Swap / Pass Sound - with 3 distinct swoosh variations
  public playSwap() {
    if (this.isMasterMuted || !this.isSfxOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      let variant = Math.floor(Math.random() * 3);
      if (variant === this.lastSwapVariant) {
        variant = (variant + 1) % 3;
      }
      this.lastSwapVariant = variant;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (variant === 0) {
        // Deep airy filter whoosh
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.13);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.13);
      } else if (variant === 1) {
        // Quick slide swoop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
      } else {
        // Crisp card snap flip
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.11);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.11);
      }

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {}
  }

  // 6. Natural Organic Mechanical Tick-Tock (Alternating soft woodblock tone, non-grating!)
  public playTick() {
    if (this.isMasterMuted || !this.isSfxOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      this.tickToggle = !this.tickToggle;

      // Alternating "Tick" (higher wood) and "Tock" (lower wood)
      const freq = this.tickToggle ? 920 : 640;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.02);

      // Very subtle, quiet volume so it doesn't fatigue players during a 90s round
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.025);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) {}
  }

  // 7. Final 5 Seconds Urgent Dramatic Siren/Alarm (Exciting building pitch, non-piercing)
  public playUrgentTick(secondsRemaining: number) {
    if (this.isMasterMuted || !this.isSfxOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      // Ascending pitch base as countdown reaches 1
      const stepIndex = Math.max(1, Math.min(5, secondsRemaining));
      const pitchOffset = (6 - stepIndex) * 90; // 900Hz -> 1260Hz

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      const freq1 = 800 + pitchOffset;
      const freq2 = freq1 * 1.5; // Perfect 5th overtone for musical tension

      osc1.frequency.setValueAtTime(freq1, now);
      osc1.frequency.exponentialRampToValueAtTime(freq1 * 1.2, now + 0.08);

      osc2.frequency.setValueAtTime(freq2, now);
      osc2.frequency.exponentialRampToValueAtTime(freq2 * 1.2, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(dest);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.09);
      osc2.stop(now + 0.09);
    } catch (e) {}
  }

  // 8. Elimination / Team Defeat Sound
  public playElimination() {
    if (this.isMasterMuted || !this.isSfxOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      const notes = [311.13, 293.66, 261.63, 220.0, 164.81]; // Descending minor tones
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.11);

        gain.gain.setValueAtTime(0.18, now + i * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.11 + 0.19);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(now + i * 0.11);
        osc.stop(now + i * 0.11 + 0.19);
      });
    } catch (e) {}
  }

  // 9. Round Ended Resonant Gong
  public playRoundEnd() {
    if (this.isMasterMuted || !this.isSfxOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.7);

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.7);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 0.7);
      subOsc.stop(now + 0.7);
    } catch (e) {}
  }

  // 10. Victory Fanfare (Rich celebratory progression)
  public playVictory() {
    if (this.isMasterMuted || !this.isSfxOn) return;
    this.stopBGM();
    const ctx = this.getAudioContext();
    const dest = this.getSfxDestination();
    if (!ctx || !dest) return;

    try {
      const now = ctx.currentTime;
      const melody = [
        { f: 523.25, d: 0.11 }, // C5
        { f: 659.25, d: 0.11 }, // E5
        { f: 783.99, d: 0.11 }, // G5
        { f: 1046.50, d: 0.28 }, // C6
        { f: 880.00, d: 0.14 }, // A5
        { f: 1046.50, d: 0.14 }, // C6
        { f: 1318.51, d: 0.45 }, // E6
      ];

      let t = now;
      melody.forEach(({ f, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + d);

        osc.connect(gain);
        gain.connect(dest);

        osc.start(t);
        osc.stop(t + d);
        t += d * 0.92;
      });
    } catch (e) {}
  }

  // --- PROCEDURAL POLYPHONIC BACKGROUND MUSIC (BGM) ---

  // 1. Menu & Ambient BGM (Warm, relaxing 32-step progression: Cmaj7 - Am7 - Dm7 - G7)
  public startMenuBGM() {
    if (this.isMasterMuted || !this.isBgmOn) return;
    if (this.currentBgmMode === 'menu') return;

    this.stopBGM();
    this.currentBgmMode = 'menu';
    this.bgmStep = 0;
    this.scheduleNextMenuBeat();
  }

  private scheduleNextMenuBeat() {
    if (this.currentBgmMode !== 'menu' || this.isMasterMuted || !this.isBgmOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getBgmDestination();
    if (!ctx || !dest) return;

    // Upbeat relaxed tempo (300ms per step)
    const stepMs = 300;

    // 32-step rich melodic chord sequence with pleasant variations
    const melodySeq = [
      // Phrase 1: Cmaj7
      523.25, 659.25, 783.99, 987.77, 783.99, 659.25, 523.25, null,
      // Phrase 2: Am7
      440.00, 523.25, 659.25, 880.00, 659.25, 523.25, 440.00, null,
      // Phrase 3: Dm7
      587.33, 698.46, 880.00, 1046.50, 880.00, 698.46, 587.33, null,
      // Phrase 4: G9 resolution
      392.00, 493.88, 587.33, 739.99, 880.00, 739.99, 587.33, 523.25
    ];

    const bassSeq = [
      130.81, null, 130.81, null, 164.81, null, 196.00, null, // C3
      110.00, null, 110.00, null, 130.81, null, 164.81, null, // A2
      146.83, null, 146.83, null, 174.61, null, 220.00, null, // D3
      98.00,  null, 98.00,  null, 123.47, null, 146.83, null  // G2
    ];

    try {
      const now = ctx.currentTime;
      const step = this.bgmStep % 32;
      const mNote = melodySeq[step];
      const bNote = bassSeq[step];

      // Soft Warm Kalimba/Rhodes Melody
      if (mNote !== null) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(mNote, now);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.26);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(now);
        osc.stop(now + 0.26);
      }

      // Warm acoustic bass
      if (bNote !== null) {
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(bNote, now);
        bassGain.gain.setValueAtTime(0.045, now);
        bassGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.38);
        bassOsc.connect(bassGain);
        bassGain.connect(dest);
        bassOsc.start(now);
        bassOsc.stop(now + 0.38);
      }
    } catch (e) {}

    this.bgmStep++;
    if (this.bgmTimeout) {
      window.clearTimeout(this.bgmTimeout);
    }
    this.bgmTimeout = window.setTimeout(() => {
      this.scheduleNextMenuBeat();
    }, stepMs);
  }

  // 2. Gameplay Dynamic Rhythm BGM
  public startGameplayBGM(secondsRemaining: number) {
    if (this.isMasterMuted || !this.isBgmOn) return;
    if (this.currentBgmMode === 'game') return;

    this.stopBGM();
    this.currentBgmMode = 'game';
    this.bgmStep = 0;
    this.scheduleNextGameBeat(secondsRemaining);
  }

  private scheduleNextGameBeat(secondsRemaining: number) {
    if (this.currentBgmMode !== 'game' || this.isMasterMuted || !this.isBgmOn) return;
    const ctx = this.getAudioContext();
    const dest = this.getBgmDestination();
    if (!ctx || !dest) return;

    // Tempo adapts smoothly
    let stepMs = 240;
    if (secondsRemaining <= 5) stepMs = 140;
    else if (secondsRemaining <= 15) stepMs = 175;
    else if (secondsRemaining <= 30) stepMs = 205;

    // 16-step dynamic bass groove
    const bassRhythm = [
      110.0, 110.0, 130.81, 146.83, 164.81, 146.83, 130.81, 98.0,
      110.0, 130.81, 146.83, 174.61, 164.81, 146.83, 110.0, 130.81
    ];

    try {
      const now = ctx.currentTime;
      const note = bassRhythm[this.bgmStep % bassRhythm.length];

      // Warm pulsing bass note
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, now);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(now);
      osc.stop(now + 0.12);

      // Subtle shaker rhythm on odd beats
      if (this.bgmStep % 2 === 1) {
        const shaker = ctx.createOscillator();
        const shakerGain = ctx.createGain();
        shaker.type = 'sine';
        shaker.frequency.setValueAtTime(2400 + Math.random() * 400, now);
        shakerGain.gain.setValueAtTime(0.015, now);
        shakerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        shaker.connect(shakerGain);
        shakerGain.connect(dest);

        shaker.start(now);
        shaker.stop(now + 0.03);
      }
    } catch (e) {}

    this.bgmStep++;
    if (this.bgmTimeout) {
      window.clearTimeout(this.bgmTimeout);
    }
    this.bgmTimeout = window.setTimeout(() => {
      this.scheduleNextGameBeat(secondsRemaining);
    }, stepMs);
  }

  public stopBGM() {
    this.currentBgmMode = 'none';
    if (this.bgmTimeout) {
      window.clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }
}

export const sound = new SoundManager();
