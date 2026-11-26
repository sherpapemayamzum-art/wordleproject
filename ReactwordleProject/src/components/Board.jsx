
import Row from './Row';
import { MAX_TURNS } from '../hooks/useWordle';


export default function Board({ guesses, currentGuess, turn }) {
  return (
    <div className="board">
      {Array.from({ length: MAX_TURNS }).map((_, index) => (
        <Row
          key={index}
          guess={guesses[index]}
          currentGuess={index === turn ? currentGuess : null}
        />
      ))}
    </div>
  );
}