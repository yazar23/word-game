import React from 'react';
import { GameMode, GameDirection } from '../types';
import { GameProvider } from '../context/GameContext';
import MultipleChoiceGame from './games/MultipleChoiceGame';
import TypingGame from './games/TypingGame';
import FlashcardGame from './games/FlashcardGame';
import StatsDisplay from './StatsDisplay';

interface GameContainerProps {
  gameMode: GameMode;
  gameDirection: GameDirection;
}

const GameContainer: React.FC<GameContainerProps> = ({ gameMode, gameDirection }) => {
  return (
    <GameProvider>
      <div className="max-w-2xl mx-auto">
        <StatsDisplay />
        
        <div className="mt-8">
          {gameMode === 'multiple-choice' && <MultipleChoiceGame gameDirection={gameDirection} />}
          {gameMode === 'typing' && <TypingGame gameDirection={gameDirection} />}
          {gameMode === 'flashcard' && <FlashcardGame gameDirection={gameDirection} />}
        </div>
      </div>
    </GameProvider>
  );
};

export default GameContainer;