import React from 'react';
import { useGameStats } from '../context/GameContext';
import { Siren as Fire, Trophy, BarChart2 } from 'lucide-react';

const StatsDisplay: React.FC = () => {
  const { stats, resetStats } = useGameStats();
  
  const accuracy = stats.totalPlayed > 0 
    ? Math.round((stats.correct / stats.totalPlayed) * 100) 
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 animate-fadeIn transition-all duration-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Your Progress</h2>
        <button 
          onClick={resetStats}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-800 rounded-full mb-2">
            <Trophy size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.correct}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Correct</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center bg-orange-100 dark:bg-orange-800 rounded-full mb-2">
            <Fire size={16} className="text-orange-600 dark:text-orange-400" />
          </div>
          <span className="text-xl font-bold text-orange-600 dark:text-orange-400">{stats.streak}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Streak</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
          <div className="w-8 h-8 flex items-center justify-center bg-teal-100 dark:bg-teal-800 rounded-full mb-2">
            <BarChart2 size={16} className="text-teal-600 dark:text-teal-400" />
          </div>
          <span className="text-xl font-bold text-teal-600 dark:text-teal-400">{accuracy}%</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Accuracy</span>
        </div>
      </div>
      
      {stats.totalPlayed > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Total words: {stats.totalPlayed}</span>
            <span>Incorrect: {stats.incorrect}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsDisplay;