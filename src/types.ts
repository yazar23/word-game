export type Word = {
  id: number;
  turkish: string;
  english: string;
  partOfSpeech: string;
  examples: {
    turkish: string;
    english: string;
  }[];
  difficulty: 1 | 2 | 3;
};

export type GameMode = 'multiple-choice' | 'typing' | 'flashcard';
export type GameDirection = 'tr-to-en' | 'en-to-tr';
export type ThemeMode = 'light' | 'dark' | 'system';

export type GameStats = {
  correct: number;
  incorrect: number;
  streak: number;
  totalPlayed: number;
};

export interface GameContextType {
  stats: GameStats;
  updateStats: (correct: boolean) => void;
  resetStats: () => void;
}