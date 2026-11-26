import { useState } from 'react';
import { checkGuess } from '../utils/checkGuess';
export const WORD_LENGTH = 5;
export const MAX_TURNS = 6;
export function useWordle(solutionWord) {
  const [turn, setTurn] = useState(0);                      
  const [currentGuess, setCurrentGuess] = useState('');      
  const [guesses, setGuesses] = useState(Array(MAX_TURNS).fill(null)); 
  const [pastGuesses, setPastGuesses] = useState([]);        
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS'); 
  const [usedKeys, setUsedKeys] = useState({});              
  const [message, setMessage] = useState('');                
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 1500);
  };
  const addLetter = (letter) => {
    setCurrentGuess((prev) => (prev.length < WORD_LENGTH ? prev + letter : prev));
  };
  const removeLetter = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };
  const submitGuess = () => {
    if (gameStatus !== 'IN_PROGRESS') return;
    if (currentGuess.length !== WORD_LENGTH) {
      showMessage('Not enough letters');
      return;
    }
    const formattedGuess = checkGuess(currentGuess, solutionWord);
    setGuesses((prev) => {
      const next = [...prev];
      next[turn] = formattedGuess;
      return next; });
    setPastGuesses((prev) => [...prev, currentGuess]);
    setUsedKeys((prev) => {
      const next = { ...prev };
      formattedGuess.forEach(({ letter, status }) => {
        const current = next[letter];
        if (status === 'correct') next[letter] = 'correct';
        else if (status === 'present' && current !== 'correct') next[letter] = 'present';
        else if (status === 'absent' && !current) next[letter] = 'absent';});
      return next; });
    if (currentGuess === solutionWord) {
      setGameStatus('WON');
    } else if (turn + 1 >= MAX_TURNS) {
      setGameStatus('LOST');}
    setTurn((prev) => prev + 1);
    setCurrentGuess(''); };
  const handleKeyup = (key) => {
    if (gameStatus !== 'IN_PROGRESS') return; 
    if (key === 'Enter') return submitGuess();
    if (key === 'Backspace') return removeLetter();
    if (/^[a-zA-Z]$/.test(key)) addLetter(key.toLowerCase());};
  return {
    turn, currentGuess, guesses, pastGuesses, gameStatus, usedKeys, message, handleKeyup, };}