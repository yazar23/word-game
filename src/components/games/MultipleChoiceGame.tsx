import React, { useState, useEffect } from 'react';
import { GameDirection, Word } from '../../types';
import { getRandomWords, getRandomIncorrectAnswers } from '../../data/words';
import { useGameStats } from '../../context/GameContext';
import { Check, X, ChevronRight } from 'lucide-react';

interface MultipleChoiceGameProps {
  gameDirection: GameDirection;
}

const MultipleChoiceGame: React.FC<MultipleChoiceGameProps> = ({ gameDirection }) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { updateStats } = useGameStats();

  const loadNewWord = () => {
    setLoading(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
    
    setTimeout(() => {
      const randomWords = getRandomWords(1);
      const word = randomWords[0];
      setCurrentWord(word);
      
      const correctAnswer = gameDirection === 'tr-to-en' ? word.english : word.turkish;
      const incorrectAnswers = gameDirection === 'tr-to-en' 
        ? getRandomIncorrectAnswers(word, 3) 
        : getRandomWords(3).map(w => w.turkish);
        
      const allChoices = [correctAnswer, ...incorrectAnswers];
      setChoices(allChoices.sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    loadNewWord();
  }, [gameDirection]);

  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    const correctAnswer = gameDirection === 'tr-to-en' 
      ? currentWord?.english 
      : currentWord?.turkish;
      
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    updateStats(correct);
    if (correct) {
  const correctSound = new Audio(`${import.meta.env.BASE_URL}correct.mp3`);
  correctSound.play().catch((error) => {
    console.error("Audio playback failed:", error);
  });
}
   if (!correct) {
  const wrongSound = new Audio(`${import.meta.env.BASE_URL}wrong.mp3`);
  wrongSound.play().catch((error) => {
    console.error("Wrong answer sound failed:", error);
  });
} 
  };

  const handleNextWord = () => {
    loadNewWord();
  };

  if (loading || !currentWord) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-40"></div>
      </div>
    );
  }

  const questionWord = gameDirection === 'tr-to-en' ? currentWord.turkish : currentWord.english;
  const correctAnswer = gameDirection === 'tr-to-en' ? currentWord.english : currentWord.turkish;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 animate-fadeIn">
      <div className="px-6 py-8 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {gameDirection === 'tr-to-en' ? 'Turkish to English' : 'English to Turkish'}
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{questionWord}</p>
        {currentWord.examples.length > 0 && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 italic">
            {gameDirection === 'tr-to-en' ? currentWord.examples[0].turkish : currentWord.examples[0].english}
          </p>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-4 grid grid-cols-1 gap-3">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(choice)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-lg text-left transition-all duration-200 ${
                selectedAnswer === null 
                  ? 'hover:bg-gray-50 dark:hover:bg-gray-700 bg-gray-100 dark:bg-gray-700'
                  : selectedAnswer === choice
                    ? isCorrect
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    : choice === correctAnswer && selectedAnswer !== null
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-700 opacity-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{choice}</span>
                {selectedAnswer === choice && (
                  isCorrect 
                    ? <Check className="text-green-600 dark:text-green-400" size={20} /> 
                    : <X className="text-red-600 dark:text-red-400" size={20} />
                )}
                {choice === correctAnswer && selectedAnswer !== null && selectedAnswer !== choice && (
                  <Check className="text-green-600 dark:text-green-400" size={20} />
                )}
              </div>
            </button>
          ))}
        </div>
        
        {selectedAnswer !== null && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleNextWord}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors duration-200"
            >
              Next <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleChoiceGame;
