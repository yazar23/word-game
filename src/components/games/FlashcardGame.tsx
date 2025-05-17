import React, { useState, useEffect } from 'react';
import { GameDirection, Word } from '../../types';
import { getRandomWords } from '../../data/words';
import { useGameStats } from '../../context/GameContext';
import { ChevronRight, ChevronLeft, RotateCw, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FlashcardGameProps {
  gameDirection: GameDirection;
}

const FlashcardGame: React.FC<FlashcardGameProps> = ({ gameDirection }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const { updateStats } = useGameStats();

  const loadWords = () => {
    setLoading(true);
    setFlipped(false);
    
    setTimeout(() => {
      const randomWords = getRandomWords(10);
      setWords(randomWords);
      setCurrentIndex(0);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    loadWords();
  }, [gameDirection]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const handleKnown = () => {
    updateStats(true);
    handleNext();
  };

  const handleUnknown = () => {
    updateStats(false);
    handleNext();
  };

  if (loading || words.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-40"></div>
      </div>
    );
  }

  const currentWord = words[currentIndex];
  const frontSide = gameDirection === 'tr-to-en' ? currentWord.turkish : currentWord.english;
  const backSide = gameDirection === 'tr-to-en' ? currentWord.english : currentWord.turkish;
  const example = gameDirection === 'tr-to-en' 
    ? (flipped ? currentWord.examples[0]?.english : currentWord.examples[0]?.turkish)
    : (flipped ? currentWord.examples[0]?.turkish : currentWord.examples[0]?.english);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 animate-fadeIn">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {gameDirection === 'tr-to-en' ? 'Turkish to English' : 'English to Turkish'}
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {words.length}
        </div>
      </div>
      
      <div 
        className={`relative p-8 min-h-[250px] ${flipped ? 'bg-blue-50 dark:bg-blue-900/20' : ''} cursor-pointer transition-all duration-300`}
        onClick={handleFlip}
      >
        <div className={`transform transition-all duration-500 ${flipped ? 'scale-0' : 'scale-100'} absolute inset-0 flex flex-col items-center justify-center p-8`}>
          <p className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">{frontSide}</p>
          {example && <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2 italic">{example}</p>}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">Tap to reveal translation</p>
        </div>
        <div className={`transform transition-all duration-500 ${flipped ? 'scale-100' : 'scale-0'} absolute inset-0 flex flex-col items-center justify-center p-8`}>
          <p className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">{backSide}</p>
          {example && <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2 italic">{example}</p>}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">Tap to hide translation</p>
        </div>
      </div>
      
      <div className="p-4 flex justify-between">
        <div>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-2 rounded-lg mr-2 ${
              currentIndex === 0
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            } transition-colors`}
            aria-label="Previous word"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={loadWords}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Refresh words"
          >
            <RotateCw size={20} />
          </button>
        </div>
        
        {flipped && (
          <div className="flex space-x-2">
            <button
              onClick={handleUnknown}
              className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <ThumbsDown size={16} className="mr-1" /> Don't Know
            </button>
            <button
              onClick={handleKnown}
              className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
            >
              <ThumbsUp size={16} className="mr-1" /> Know It
            </button>
          </div>
        )}
        
        <button
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
          className={`p-2 rounded-lg ${
            currentIndex === words.length - 1
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          } transition-colors`}
          aria-label="Next word"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default FlashcardGame;