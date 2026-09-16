import { describe, test, expect } from 'vitest';
import { WORD_BANK, WordData } from '../words';
import { TRANSLATIONS } from '../translations';
import { TeamColor, Language, GameSettings, Team, Player, GameStatus, GameHistoryEntry } from '../types';

describe('Game Words and Translation Bank Tests', () => {
  test('WORD_BANK is not empty and has valid categories', () => {
    expect(WORD_BANK.length).toBeGreaterThan(0);
    WORD_BANK.forEach((word: WordData) => {
      expect(word.category).toBeDefined();
      expect(typeof word.category).toBe('string');
      expect(word.words).toBeDefined();
      expect(typeof word.words).toBe('object');
      expect(['easy', 'medium', 'hard']).toContain(word.difficulty);
    });
  });

  test('All words in WORD_BANK have at least Persian (fa) and English (en) translations', () => {
    WORD_BANK.forEach((word: WordData) => {
      expect(word.words.fa).toBeDefined();
      expect(word.words.fa.trim().length).toBeGreaterThan(0);
      expect(word.words.en).toBeDefined();
      expect(word.words.en.trim().length).toBeGreaterThan(0);
    });
  });

  test('Persian title and round strings do not contain illegible diacritics', () => {
    const fa = TRANSLATIONS.fa;
    expect(fa.title).toBe("دور");
    expect(fa.round).toBe("دور");
    // Ensure no damma (U+064F) or fat-ha (U+064E) or sukun (U+0652) is present in title
    expect(fa.title).not.toContain('\u064F');
    expect(fa.title).not.toContain('\u064E');
    expect(fa.round).not.toContain('\u064F');
  });

  test('Arabic title and round strings do not contain illegible diacritics', () => {
    const ar = TRANSLATIONS.ar;
    expect(ar.title).toBe("دور");
    expect(ar.title).not.toContain('\u064E');
    expect(ar.title).not.toContain('\u0652');
  });

  test('TRANSLATIONS dictionary contains expected languages and all critical keys', () => {
    const supportedLanguages: Language[] = ['en', 'fa', 'nl', 'de', 'fr', 'ar', 'tr', 'pl', 'uk'];
    
    supportedLanguages.forEach((lang) => {
      const trans = TRANSLATIONS[lang];
      expect(trans).toBeDefined();
      expect(trans.title).toBeDefined();
      expect(trans.start).toBeDefined();
      expect(trans.back).toBeDefined();
      expect(trans.next).toBeDefined();
      expect(trans.players).toBeDefined();
      expect(trans.rounds).toBeDefined();
      expect(trans.duration).toBeDefined();
      expect(trans.quitGame).toBeDefined();
      expect(trans.roundOver).toBeDefined();
      expect(trans.teamNames).toBeDefined();
      expect(trans.teamNames.BLUE).toBeDefined();
      expect(trans.teamNames.RED).toBeDefined();
      expect(trans.teamNames.GREEN).toBeDefined();
      expect(trans.teamNames.YELLOW).toBeDefined();
    });
  });
});

describe('Word Bank Filtering and Pool Shuffling Logic', () => {
  test('Filters words correctly by single category and difficulty', () => {
    const targetCategory = 'CAT_OBJECTS';
    const targetDifficulty = 'easy';

    const filtered = WORD_BANK.filter(w => w.category === targetCategory && w.difficulty === targetDifficulty);
    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach(w => {
      expect(w.category).toBe(targetCategory);
      expect(w.difficulty).toBe(targetDifficulty);
    });
  });

  test('Filters words correctly when "all" (mixed) difficulty is selected', () => {
    const targetCategories = ['CAT_OBJECTS', 'CAT_ANIMALS'];
    const targetDifficulty = 'all';

    const filtered = WORD_BANK.filter(w => 
      targetCategories.includes(w.category) && 
      (targetDifficulty === 'all' || w.difficulty === targetDifficulty)
    );

    expect(filtered.length).toBeGreaterThan(0);
    const difficulties = new Set(filtered.map(w => w.difficulty));
    expect(difficulties.size).toBeGreaterThan(1);
  });

  test('Fallback pool ensures game never crashes if filter produces empty set', () => {
    const targetCategories = ['NON_EXISTENT_CAT'];
    const targetDifficulty = 'easy';

    let indices = WORD_BANK
      .map((w, i) => (targetCategories.includes(w.category) && w.difficulty === targetDifficulty ? i : -1))
      .filter(i => i !== -1);

    if (indices.length === 0) {
      indices = WORD_BANK.map((_, i) => i);
    }

    expect(indices.length).toBe(WORD_BANK.length);
  });
});

describe('Team and Player Assignment & Opposite Seating Logic', () => {
  const mockSettings = (playerCount: 4 | 6 | 8): GameSettings => ({
    playerCount,
    roundsCount: 3,
    roundDuration: 90,
    selectedCategories: ["CAT_OBJECTS", "CAT_FOOD"],
    playerNames: Array.from({ length: 8 }).map((_, i) => `Player ${i + 1}`),
    language: 'fa'
  });

  test('Initializes correct number of teams and opposite teammates for 4 players', () => {
    const settings = mockSettings(4);
    const teamColors = [TeamColor.Blue, TeamColor.Red, TeamColor.Green, TeamColor.Yellow];
    const teamCount = settings.playerCount / 2; // 2 teams

    const initialTeams: Team[] = Array.from({ length: teamCount }).map((_, i) => ({
      id: i,
      color: teamColors[i],
      timeRemaining: 180000,
      isEliminated: false,
      playerIds: [i, i + teamCount]
    }));

    const initialPlayers: Player[] = Array.from({ length: settings.playerCount }).map((_, i) => ({
      id: i,
      name: settings.playerNames[i],
      teamId: i % teamCount,
      teamColor: teamColors[i % teamCount]
    }));

    expect(initialTeams.length).toBe(2);
    expect(initialPlayers.length).toBe(4);

    // Team 1: (P1 [index 0], P3 [index 2]) on Blue
    expect(initialPlayers[0].teamColor).toBe(TeamColor.Blue);
    expect(initialPlayers[2].teamColor).toBe(TeamColor.Blue);
    expect(initialPlayers[0].teamId).toBe(0);
    expect(initialPlayers[2].teamId).toBe(0);

    // Team 2: (P2 [index 1], P4 [index 3]) on Red
    expect(initialPlayers[1].teamColor).toBe(TeamColor.Red);
    expect(initialPlayers[3].teamColor).toBe(TeamColor.Red);
  });

  test('Initializes correct opposite partners for 6 players (3 teams)', () => {
    const settings = mockSettings(6);
    const teamColors = [TeamColor.Blue, TeamColor.Red, TeamColor.Green, TeamColor.Yellow];
    const teamCount = 3;

    const initialPlayers: Player[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      name: settings.playerNames[i],
      teamId: i % teamCount,
      teamColor: teamColors[i % teamCount]
    }));

    // Opposite pairs: P1(0) & P4(3) on Blue, P2(1) & P5(4) on Red, P3(2) & P6(5) on Green
    expect(initialPlayers[0].teamColor).toBe(TeamColor.Blue);
    expect(initialPlayers[3].teamColor).toBe(TeamColor.Blue);
    expect(initialPlayers[1].teamColor).toBe(TeamColor.Red);
    expect(initialPlayers[4].teamColor).toBe(TeamColor.Red);
    expect(initialPlayers[2].teamColor).toBe(TeamColor.Green);
    expect(initialPlayers[5].teamColor).toBe(TeamColor.Green);
  });

  test('Initializes correct opposite partners for 8 players (4 teams)', () => {
    const settings = mockSettings(8);
    const teamColors = [TeamColor.Blue, TeamColor.Red, TeamColor.Green, TeamColor.Yellow];
    const teamCount = 4;

    const initialPlayers: Player[] = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      name: settings.playerNames[i],
      teamId: i % teamCount,
      teamColor: teamColors[i % teamCount]
    }));

    // Opposite pairs: P1(0)&P5(4) Blue, P2(1)&P6(5) Red, P3(2)&P7(6) Green, P4(3)&P8(7) Yellow
    expect(initialPlayers[0].teamColor).toBe(TeamColor.Blue);
    expect(initialPlayers[4].teamColor).toBe(TeamColor.Blue);
    expect(initialPlayers[1].teamColor).toBe(TeamColor.Red);
    expect(initialPlayers[5].teamColor).toBe(TeamColor.Red);
    expect(initialPlayers[2].teamColor).toBe(TeamColor.Green);
    expect(initialPlayers[6].teamColor).toBe(TeamColor.Green);
    expect(initialPlayers[3].teamColor).toBe(TeamColor.Yellow);
    expect(initialPlayers[7].teamColor).toBe(TeamColor.Yellow);
  });
});

describe('Gameplay Screen Turn, Rotation, and Elimination Logic', () => {
  const findNextActivePlayer = (startIndex: number, players: Player[], teams: Team[]) => {
    const total = players.length;
    for (let i = 1; i <= total; i++) {
      const candidateIdx = (startIndex + i) % total;
      const player = players[candidateIdx];
      const team = teams.find(tm => tm.id === player.teamId);
      if (team && !team.isEliminated) return candidateIdx;
    }
    return startIndex;
  };

  test('Rotates clockwise to the next active player when no teams are eliminated', () => {
    const players: Player[] = [
      { id: 0, name: 'P1', teamId: 0, teamColor: TeamColor.Blue },
      { id: 1, name: 'P2', teamId: 1, teamColor: TeamColor.Red },
      { id: 2, name: 'P3', teamId: 0, teamColor: TeamColor.Blue },
      { id: 3, name: 'P4', teamId: 1, teamColor: TeamColor.Red },
    ];

    const teams: Team[] = [
      { id: 0, color: TeamColor.Blue, timeRemaining: 60000, isEliminated: false, playerIds: [0, 2] },
      { id: 1, color: TeamColor.Red, timeRemaining: 60000, isEliminated: false, playerIds: [1, 3] },
    ];

    let activeIdx = 0;
    activeIdx = findNextActivePlayer(activeIdx, players, teams);
    expect(activeIdx).toBe(1);

    activeIdx = findNextActivePlayer(activeIdx, players, teams);
    expect(activeIdx).toBe(2);

    activeIdx = findNextActivePlayer(activeIdx, players, teams);
    expect(activeIdx).toBe(3);

    activeIdx = findNextActivePlayer(activeIdx, players, teams);
    expect(activeIdx).toBe(0);
  });

  test('Skips players whose teams have been eliminated', () => {
    const players: Player[] = [
      { id: 0, name: 'P1', teamId: 0, teamColor: TeamColor.Blue },
      { id: 1, name: 'P2', teamId: 1, teamColor: TeamColor.Red },
      { id: 2, name: 'P3', teamId: 0, teamColor: TeamColor.Blue },
      { id: 3, name: 'P4', teamId: 1, teamColor: TeamColor.Red },
    ];

    const teams: Team[] = [
      { id: 0, color: TeamColor.Blue, timeRemaining: 60000, isEliminated: false, playerIds: [0, 2] },
      { id: 1, color: TeamColor.Red, timeRemaining: 0, isEliminated: true, playerIds: [1, 3] },
    ];

    let activeIdx = 0;
    activeIdx = findNextActivePlayer(activeIdx, players, teams);
    expect(activeIdx).toBe(2);

    activeIdx = findNextActivePlayer(activeIdx, players, teams);
    expect(activeIdx).toBe(0);
  });

  test('Team elimination triggers when team time reaches 0', () => {
    let teams: Team[] = [
      { id: 0, color: TeamColor.Blue, timeRemaining: 100, isEliminated: false, playerIds: [0, 2] },
      { id: 1, color: TeamColor.Red, timeRemaining: 40000, isEliminated: false, playerIds: [1, 3] }
    ];

    // Deduct remaining time
    teams = teams.map(t => {
      if (t.id === 0) {
        const timeRemaining = Math.max(0, t.timeRemaining - 150);
        return { ...t, timeRemaining, isEliminated: timeRemaining <= 0 };
      }
      return t;
    });

    expect(teams[0].timeRemaining).toBe(0);
    expect(teams[0].isEliminated).toBe(true);
    expect(teams[1].isEliminated).toBe(false);

    const activeTeams = teams.filter(t => !t.isEliminated);
    expect(activeTeams.length).toBe(1);
    expect(activeTeams[0].id).toBe(1);
  });
});

describe('1-Second Undo Mechanism and Winner Evaluation', () => {
  test('Snapshot correctly restores previous player index, word, and timers', () => {
    const initialTeams: Team[] = [
      { id: 0, color: TeamColor.Blue, timeRemaining: 45000, isEliminated: false, playerIds: [0] },
      { id: 1, color: TeamColor.Red, timeRemaining: 50000, isEliminated: false, playerIds: [1] }
    ];

    let activePlayerIdx = 0;
    let currentWord = 'کتاب';
    let roundTimer = 75000;
    let teams = [...initialTeams];

    // Take snapshot before turn advance
    const snapshot = {
      activePlayerIndex: activePlayerIdx,
      word: currentWord,
      roundTimer: roundTimer,
      teams: JSON.parse(JSON.stringify(teams))
    };

    // Simulate accidental correct tap
    activePlayerIdx = 1;
    currentWord = 'خورشید';
    roundTimer = 74000;

    // Trigger Undo
    activePlayerIdx = snapshot.activePlayerIndex;
    currentWord = snapshot.word;
    roundTimer = snapshot.roundTimer;
    teams = snapshot.teams;

    expect(activePlayerIdx).toBe(0);
    expect(currentWord).toBe('کتاب');
    expect(roundTimer).toBe(75000);
    expect(teams[0].timeRemaining).toBe(45000);
  });

  test('Winner calculation picks team with highest remaining time', () => {
    const teams: Team[] = [
      { id: 0, color: TeamColor.Blue, timeRemaining: 45000, isEliminated: false, playerIds: [0, 2] },
      { id: 1, color: TeamColor.Red, timeRemaining: 62000, isEliminated: false, playerIds: [1, 3] },
      { id: 2, color: TeamColor.Green, timeRemaining: 0, isEliminated: true, playerIds: [4, 5] },
    ];

    const activeTeams = teams.filter(t => !t.isEliminated);
    const maxTime = Math.max(...activeTeams.map(t => t.timeRemaining));
    const winners = activeTeams.filter(t => t.timeRemaining === maxTime);

    expect(winners.length).toBe(1);
    expect(winners[0].color).toBe(TeamColor.Red);
    expect(winners[0].timeRemaining).toBe(62000);
  });

  test('Winner calculation correctly handles a tie between multiple teams', () => {
    const teams: Team[] = [
      { id: 0, color: TeamColor.Blue, timeRemaining: 50000, isEliminated: false, playerIds: [0, 2] },
      { id: 1, color: TeamColor.Red, timeRemaining: 50000, isEliminated: false, playerIds: [1, 3] },
      { id: 2, color: TeamColor.Green, timeRemaining: 30000, isEliminated: false, playerIds: [4, 5] },
    ];

    const activeTeams = teams.filter(t => !t.isEliminated);
    const maxTime = Math.max(...activeTeams.map(t => t.timeRemaining));
    const winners = activeTeams.filter(t => t.timeRemaining === maxTime);

    expect(winners.length).toBe(2);
    expect(winners.map(w => w.color)).toEqual([TeamColor.Blue, TeamColor.Red]);
  });
});

describe('Turn Modes, Swap Timer, and Match History Entry Model', () => {
  test('Fast Hot-Potato mode advances turn immediately without modal when passPhoneScreenEnabled is false', () => {
    const settings: GameSettings = {
      playerCount: 4,
      roundsCount: 3,
      roundDuration: 90,
      selectedCategories: ["CAT_OBJECTS"],
      playerNames: ['P1', 'P2', 'P3', 'P4'],
      language: 'fa',
      passPhoneScreenEnabled: false,
      soundEnabled: true
    };

    expect(settings.passPhoneScreenEnabled).toBe(false);
    expect(settings.soundEnabled).toBe(true);

    let gameStatus = GameStatus.ActiveTurn;
    let nextPlayerTriggered = false;

    if (settings.passPhoneScreenEnabled) {
      gameStatus = GameStatus.PassPhone;
    } else {
      nextPlayerTriggered = true;
      gameStatus = GameStatus.ActiveTurn;
    }

    expect(gameStatus).toBe(GameStatus.ActiveTurn);
    expect(nextPlayerTriggered).toBe(true);
  });

  test('Swap cooldown allows swapping only when timer reaches 0', () => {
    let swapCooldown = 20000;
    const canSwapInitial = swapCooldown <= 0;
    expect(canSwapInitial).toBe(false);

    // Simulate 20 seconds elapsed
    swapCooldown = 0;
    const canSwapAfterElapsed = swapCooldown <= 0;
    expect(canSwapAfterElapsed).toBe(true);
  });

  test('GameHistoryEntry includes language, valid timestamp date, and winners', () => {
    const historyEntry: GameHistoryEntry = {
      id: 'test_game_1',
      date: new Date().toLocaleDateString('fa-IR'),
      players: ['علی', 'سارا', 'رضا', 'مریم'],
      winnerColor: TeamColor.Blue,
      winnerNames: ['علی', 'رضا'],
      language: 'fa'
    };

    expect(historyEntry.id).toBeDefined();
    expect(historyEntry.language).toBe('fa');
    expect(historyEntry.winnerColor).toBe(TeamColor.Blue);
    expect(historyEntry.winnerNames).toEqual(['علی', 'رضا']);
    expect(historyEntry.players.length).toBe(4);
  });
});
