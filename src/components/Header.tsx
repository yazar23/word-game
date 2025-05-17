import React from 'react';
import { Settings, Moon, Sun, Monitor } from 'lucide-react';
import { GameMode, GameDirection } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  gameDirection: GameDirection;
  setGameDirection: (direction: GameDirection) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  gameMode, 
  setGameMode, 
  gameDirection, 
  setGameDirection 
}) => {
  const { theme, setTheme, isDark } = useTheme();

  const handleThemeClick = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">WordMaster</h1>
            <div className="flex gap-2 md:hidden">
              <button
                onClick={handleThemeClick}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' && <Moon size={20} />}
                {theme === 'dark' && <Sun size={20} />}
                {theme === 'system' && <Monitor size={20} />}
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
              <button
                onClick={() => setGameMode('multiple-choice')}
                className={`px-3 py-1 rounded-md ${
                  gameMode === 'multiple-choice' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition-all duration-200 text-sm font-medium`}
              >
                Multiple Choice
              </button>
              <button
                onClick={() => setGameMode('typing')}
                className={`px-3 py-1 rounded-md ${
                  gameMode === 'typing' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition-all duration-200 text-sm font-medium`}
              >
                Typing
              </button>
              <button
                onClick={() => setGameMode('flashcard')}
                className={`px-3 py-1 rounded-md ${
                  gameMode === 'flashcard' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition-all duration-200 text-sm font-medium`}
              >
                Flashcards
              </button>
            </div>
            
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
              <button
                onClick={() => setGameDirection('tr-to-en')}
                className={`px-3 py-1 rounded-md ${
                  gameDirection === 'tr-to-en' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition-all duration-200 text-sm font-medium`}
              >
                TR → EN
              </button>
              <button
                onClick={() => setGameDirection('en-to-tr')}
                className={`px-3 py-1 rounded-md ${
                  gameDirection === 'en-to-tr' 
                    ? 'bg-white dark:bg-gray-600 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition-all duration-200 text-sm font-medium`}
              >
                EN → TR
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex gap-2">
            <button
              onClick={handleThemeClick}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' && <Moon size={20} />}
              {theme === 'dark' && <Sun size={20} />}
              {theme === 'system' && <Monitor size={20} />}
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;