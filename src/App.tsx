import React, { useState } from 'react';
import { Settings, Moon, Sun } from 'lucide-react';
import Header from './components/Header';
import GameContainer from './components/GameContainer';
import { GameMode, GameDirection } from './types';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [gameMode, setGameMode] = useState<GameMode>('multiple-choice');
  const [gameDirection, setGameDirection] = useState<GameDirection>('tr-to-en');

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Header 
          gameMode={gameMode} 
          setGameMode={setGameMode}
          gameDirection={gameDirection}
          setGameDirection={setGameDirection}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          <GameContainer 
            gameMode={gameMode} 
            gameDirection={gameDirection} 
          />
        </main>
        <footer className="py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 Turkish-English Vocabulary Game. All rights reserved.
        </footer>
      </div>
      <button
  style={{ padding: '10px', backgroundColor: 'red', color: 'white' }}
  onClick={() => {
    const testSound = new Audio('/correct.mp3');
    testSound.play();
  }}
>
  Test Sound
</button>

    </ThemeProvider>
  );
}

export default App;
