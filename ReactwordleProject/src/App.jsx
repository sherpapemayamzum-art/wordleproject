import { useState, useEffect } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import Modal from './components/Modal';
import { useWordle } from './hooks/useWordle';
import { getRandomWord } from './data/words';
import './App.css';
function Game({ solutionWord, onPlayAgain }) {
  const { turn, currentGuess, guesses, gameStatus, usedKeys, message, handleKeyup } =
    useWordle(solutionWord);
  useEffect(() => {
    if (gameStatus !== 'IN_PROGRESS') return;
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      handleKeyup(event.key);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyup, gameStatus]);

  return (
    <div className="app">
      <h1>React Wordle</h1>
      <p className="subtitle">Guess the 5-letter word in 6 tries.</p>
      <div className="toast">{message}</div>

      <Board guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keyboard usedKeys={usedKeys} onKeyPress={handleKeyup} />

      {gameStatus !== 'IN_PROGRESS' && (
        <Modal gameStatus={gameStatus} solutionWord={solutionWord} onPlayAgain={onPlayAgain} />
      )}
    </div>
  );
}

export default function App() {
  const [solutionWord, setSolutionWord] = useState(() => getRandomWord());
  const [round, setRound] = useState(0);

  const handlePlayAgain = () => {
    setSolutionWord(getRandomWord());
    setRound((r) => r + 1); // new key -> Game remounts with fresh state
  };

  return <Game key={round} solutionWord={solutionWord} onPlayAgain={handlePlayAgain} />;
}