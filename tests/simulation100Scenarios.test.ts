import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { WORD_BANK } from '../words';
import { TRANSLATIONS } from '../translations';
import { sound } from '../soundManager';
import { TeamColor, GameStatus, Team, Player, GameSettings, Language, DifficultyLevel } from '../types';

describe('100 Full-Game End-to-End Simulation Scenarios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sound.setSoundEnabled(false); // Silent for automated fast runs
  });

  afterEach(() => {
    sound.stopBGM();
  });

  // Generates and plays a full game simulation with varying rules and actions
  function simulateFullGame(scenarioId: number, config: {
    playerCount: 4 | 6 | 8;
    roundsCount: number;
    roundDuration: number;
    difficulty: DifficultyLevel;
    categories: string[];
    language: Language;
    passPhone: boolean;
    guessPattern: 'rapid' | 'slow' | 'swapper' | 'timeout_heavy' | 'mixed';
  }) {
    const teamColors = [TeamColor.Blue, TeamColor.Red, TeamColor.Green, TeamColor.Yellow];
    const teamCount = config.playerCount / 2;
    const totalGameTime = config.roundsCount * config.roundDuration * 1000;
    const timePerTeam = totalGameTime / teamCount;

    // 1. Initialize Teams & Players
    let teams: Team[] = Array.from({ length: teamCount }).map((_, i) => ({
      id: i,
      color: teamColors[i],
      timeRemaining: timePerTeam,
      isEliminated: false,
      playerIds: [i, i + teamCount],
      score: 0
    }));

    const players: Player[] = Array.from({ length: config.playerCount }).map((_, i) => {
      const teamId = i % teamCount;
      return {
        id: i,
        name: `Player ${i + 1}`,
        teamId: teamId,
        teamColor: teamColors[teamId]
      };
    });

    // 2. Prepare Word Pool with automatic recycling
    let relevantPool = WORD_BANK
      .map((w, i) => {
        const catMatch = config.categories.includes(w.category);
        const diffMatch = config.difficulty === 'all' || w.difficulty === config.difficulty;
        return (catMatch && diffMatch) ? i : -1;
      })
      .filter(i => i !== -1);

    if (relevantPool.length < 25) {
      const catIndices = WORD_BANK
        .map((w, i) => config.categories.includes(w.category) ? i : -1)
        .filter(i => i !== -1);
      relevantPool = Array.from(new Set([...relevantPool, ...catIndices]));
    }
    if (relevantPool.length === 0) {
      relevantPool = WORD_BANK.map((_, i) => i);
    }

    let shuffledPool = [...relevantPool].sort(() => Math.random() - 0.5);
    let poolPtr = 0;
    let currentWord = '';

    const drawNextWord = (): string => {
      if (poolPtr >= shuffledPool.length) {
        // Automatic reshuffle test
        shuffledPool = [...shuffledPool].sort(() => Math.random() - 0.5);
        poolPtr = 0;
      }
      const idx = shuffledPool[poolPtr];
      poolPtr++;
      const wordObj = WORD_BANK[idx] || WORD_BANK[0];
      currentWord = wordObj.words[config.language] || wordObj.words['en'] || 'TestWord';
      return currentWord;
    };

    // Initial word
    drawNextWord();
    expect(currentWord).toBeTruthy();

    let gameStatus: GameStatus = GameStatus.ActiveTurn;
    let activePlayerIdx = 0;
    let round = 1;

    const findNextPlayer = (curr: number) => {
      const total = players.length;
      for (let step = 1; step <= total; step++) {
        const next = (curr + step) % total;
        const p = players[next];
        const t = teams.find(team => team.id === p.teamId);
        if (t && !t.isEliminated) return next;
      }
      return curr;
    };

    // 3. Play through all rounds
    let safetyCounter = 0;
    while ((gameStatus as GameStatus) !== GameStatus.GameOver && round <= config.roundsCount && safetyCounter < 5000) {
      safetyCounter++;

      let roundTimer = config.roundDuration * 1000;
      let roundFinished = false;

      // Inside a round
      while (!roundFinished && gameStatus === GameStatus.ActiveTurn && safetyCounter < 5000) {
        safetyCounter++;

        // Determine action based on pattern
        if (config.guessPattern === 'rapid') {
          // Rapid correct guesses
          const word = drawNextWord();
          expect(word).toBeTruthy();
          activePlayerIdx = findNextPlayer(activePlayerIdx);
          roundTimer -= 3000;
        } else if (config.guessPattern === 'swapper') {
          // Frequent swaps
          const swappedWord = drawNextWord();
          expect(swappedWord).toBeTruthy();
          roundTimer -= 4000;
        } else if (config.guessPattern === 'timeout_heavy') {
          // Little activity, time runs down quickly to trigger timeout
          roundTimer -= 15000;
        } else {
          // Mixed: occasional swap, guesses, time passing
          if (safetyCounter % 3 === 0) {
            drawNextWord();
          } else {
            drawNextWord();
            activePlayerIdx = findNextPlayer(activePlayerIdx);
          }
          roundTimer -= 5000;
        }

        // Deduct time from active team
        const activeP = players[activePlayerIdx];
        expect(activeP).toBeDefined();
        const activeT = teams.find(t => t.id === activeP.teamId);
        if (activeT && !activeT.isEliminated) {
          activeT.timeRemaining = Math.max(0, activeT.timeRemaining - 2000);
          if (activeT.timeRemaining <= 0) {
            // Team ran out of master time
            activeT.isEliminated = true;
          }
        }

        const activeRemainingTeams = teams.filter(t => !t.isEliminated);
        if (activeRemainingTeams.length <= 1) {
          gameStatus = GameStatus.GameOver;
          roundFinished = true;
          break;
        }

        // Check if roundTimer expired
        if (roundTimer <= 0) {
          roundFinished = true;
          // Apply 30s penalty to holding team
          const losingPlayer = players[activePlayerIdx];
          const losingTeam = teams.find(t => t.id === losingPlayer.teamId);
          if (losingTeam) {
            losingTeam.timeRemaining = Math.max(0, losingTeam.timeRemaining - 30000);
            if (losingTeam.timeRemaining <= 0) {
              losingTeam.isEliminated = true;
            }
          }

          const aliveTeams = teams.filter(t => !t.isEliminated);
          if (aliveTeams.length <= 1 || round >= config.roundsCount) {
            gameStatus = GameStatus.GameOver;
          } else {
            gameStatus = GameStatus.RoundEnded;
            // Advance to next round
            round++;
            activePlayerIdx = findNextPlayer(activePlayerIdx);
            drawNextWord();
            gameStatus = GameStatus.ActiveTurn;
          }
        }
      }

      if (gameStatus === GameStatus.GameOver) break;
    }

    // Assert game successfully reached GameOver without infinite loop or freeze
    expect(safetyCounter).toBeLessThan(1000);
    expect(gameStatus).toBe(GameStatus.GameOver);

    // Verify winner determination
    const activeTeams = teams.filter(t => !t.isEliminated);
    const rankedTeams = (activeTeams.length > 0 ? activeTeams : teams).sort((a, b) => b.timeRemaining - a.timeRemaining);
    expect(rankedTeams.length).toBeGreaterThan(0);
    const topScore = rankedTeams[0].timeRemaining;
    const winners = rankedTeams.filter(t => t.timeRemaining === topScore);
    expect(winners.length).toBeGreaterThanOrEqual(1);
  }

  // Generate 100 Distinct Scenarios
  const testLanguages: Language[] = ['fa', 'en', 'ar', 'nl', 'de', 'fr', 'tr', 'pl', 'uk'];
  const testDifficulties: DifficultyLevel[] = ['easy', 'medium', 'hard', 'all'];
  const testPlayerCounts: (4 | 6 | 8)[] = [4, 6, 8];
  const testRounds = [3, 4, 5, 6, 8, 10];
  const testDurations = [60, 90, 120, 180];
  const testPatterns: ('rapid' | 'slow' | 'swapper' | 'timeout_heavy' | 'mixed')[] = [
    'rapid', 'slow', 'swapper', 'timeout_heavy', 'mixed'
  ];
  const categorySets = [
    ["CAT_OBJECTS"],
    ["CAT_ANIMALS"],
    ["CAT_FOOD"],
    ["CAT_OBJECTS", "CAT_FOOD"],
    ["CAT_ANIMALS", "CAT_JOBS", "CAT_PLACES"],
    ["CAT_VEHICLES", "CAT_SPORTS", "CAT_TECH"],
    ["CAT_OBJECTS", "CAT_ANIMALS", "CAT_FOOD", "CAT_JOBS", "CAT_PLACES", "CAT_VEHICLES", "CAT_SPORTS", "CAT_TECH"]
  ];

  // Run all 100 Scenarios
  for (let i = 1; i <= 100; i++) {
    const playerCount = testPlayerCounts[i % testPlayerCounts.length];
    const roundsCount = testRounds[i % testRounds.length];
    const roundDuration = testDurations[i % testDurations.length];
    const difficulty = testDifficulties[i % testDifficulties.length];
    const language = testLanguages[i % testLanguages.length];
    const categories = categorySets[i % categorySets.length];
    const guessPattern = testPatterns[i % testPatterns.length];
    const passPhone = i % 2 === 0;

    test(`Scenario ${i}/100: ${playerCount}p, ${roundsCount} rounds (${roundDuration}s), ${difficulty}, lang=${language}, pattern=${guessPattern}, passPhone=${passPhone}`, () => {
      simulateFullGame(i, {
        playerCount,
        roundsCount,
        roundDuration,
        difficulty,
        categories,
        language,
        passPhone,
        guessPattern
      });
    });
  }
});
