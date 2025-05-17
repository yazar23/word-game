import React, { createContext, useContext, useState } from 'react';
import { GameStats, GameContextType } from '../types';

const initialStats: GameStats = {
  correct: 0,
  incorrect: 0,
  streak: 0,
  totalPlayed: 0
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<GameStats>(initialStats);

  const updateStats = (correct: boolean) => {
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
      streak: correct ? prev.streak + 1 : 0,
      totalPlayed: prev.totalPlayed + 1
    }));
  };

  const resetStats = () => {
    setStats(initialStats);
  };

  return (
    <GameContext.Provider value={{ stats, updateStats, resetStats }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameStats = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameStats must be used within a GameProvider');
  }
  return context;
};