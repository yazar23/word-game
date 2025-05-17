import React, { useState, useEffect, useRef } from 'react';
import { GameDirection, Word } from '../../types';
import { getRandomWords } from '../../data/words';
import { useGameStats } from '../../context/GameContext';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface TypingGameProps {
  gameDirection: GameDirection;
}

const TypingGame: React.FC<TypingGameProps> = ({ gameDirection }) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const { updateStats } = useGameStats();
  const inputRef = useRef<HTMLInputElement>(null);

  const loadNewWord = () => {
    setLoading(true);
    setAnswer('');
    setIsCorrect(null);
    setSubmitted(false);
    
    setTimeout(() => {
      const randomWords = getRandomWords(1);
      setCurrentWord(randomWords[0]);
      setLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
  };

  useEffect(() => {
    loadNewWord();
  }, [gameDirection]);

  const handleSubmitAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (submitted || !currentWord) return;
    
    const correctAnswer = gameDirection === 'tr-to-en' 
      ? currentWord.english.toLowerCase().trim() 
      : currentWord.turkish.toLowerCase().trim();
      
    const userAnswer = answer.toLowerCase().trim();
    const correct = userAnswer === correctAnswer;
    
    setIsCorrect(correct);
    setSubmitted(true);
    updateStats(correct);
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
        <form onSubmit={handleSubmitAnswer}>
          <div className="mb-4">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              {gameDirection === 'tr-to-en' ? 'Type the English translation:' : 'Type the Turkish translation:'}
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={submitted}
                className={`w-full px-4 py-3 rounded-lg border ${
                  isCorrect === null
                    ? 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                    : isCorrect
                      ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/30'
                      : 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/30'
                } focus:outline-none focus:ring-2 ${
                  isCorrect === null
                    ? 'focus:ring-blue-500 dark:focus:ring-blue-600'
                    : isCorrect
                      ? 'focus:ring-green-500 dark:focus:ring-green-600'
                      : 'focus:ring-red-500 dark:focus:ring-red-600'
                } transition-all duration-200`}
                placeholder={gameDirection === 'tr-to-en' ? 'English word...' : 'Turkish word...'}
                autoComplete="off"
              />
              {submitted && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isCorrect 
                    ? <CheckCircle className="text-green-500 dark:text-green-400" size={20} /> 
                    : <XCircle className="text-red-500 dark:text-red-400" size={20} />
                  }
                </div>
              )}
            </div>
          </div>
          
          {submitted && !isCorrect && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-300">
                Correct answer: <span className="font-semibold">{correctAnswer}</span>
              </p>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            {!submitted ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Check Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextWord}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors duration-200"
              >
                Next <ChevronRight size={16} className="ml-1" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TypingGame;