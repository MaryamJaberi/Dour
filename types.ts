
export enum TeamColor {
  Blue = 'BLUE',
  Red = 'RED',
  Green = 'GREEN',
  Yellow = 'YELLOW'
}

export type Language = 'fa' | 'en' | 'nl' | 'de' | 'fr' | 'ar' | 'tr' | 'pl' | 'uk';

export interface Player {
  id: number;
  name: string;
  teamId: number;
  teamColor: TeamColor;
}

export interface Team {
  id: number;
  color: TeamColor;
  timeRemaining: number;
  isEliminated: boolean;
  playerIds: number[];
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'all';

export interface GameSettings {
  playerCount: 4 | 6 | 8;
  roundsCount: number;
  roundDuration: number;
  difficulty?: DifficultyLevel;
  selectedCategories: string[];
  playerNames: string[];
  language: Language;
  soundEnabled?: boolean;
  sfxEnabled?: boolean;
  bgmEnabled?: boolean;
  passPhoneScreenEnabled?: boolean;
}

export interface GameHistoryEntry {
  id: string;
  date: string;
  players: string[];
  winnerColor: TeamColor | 'TIE';
  winnerNames: string[];
  language: Language;
}

export enum GameStatus {
  Splash = 'SPLASH',
  Setup = 'SETUP',
  SeatingConfirm = 'SEATING_CONFIRM',
  ActiveTurn = 'ACTIVE_TURN',
  PassPhone = 'PASS_PHONE',
  Paused = 'PAUSED',
  RoundEnded = 'ROUND_ENDED',
  TeamEliminated = 'TEAM_ELIMINATED',
  WordExhaustion = 'WORD_EXHAUSTION',
  GameEnded = 'GAME_ENDED',
  WinnerScreen = 'WINNER_SCREEN',
  // Backward-compatibility aliases
  RoundStarting = 'PASS_PHONE',
  Playing = 'ACTIVE_TURN',
  RoundFinished = 'ROUND_ENDED',
  GameOver = 'WINNER_SCREEN',
  Help = 'PAUSED'
}
