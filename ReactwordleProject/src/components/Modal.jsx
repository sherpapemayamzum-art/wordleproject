

export default function Modal({ gameStatus, solutionWord, onPlayAgain }) {
  const won = gameStatus === 'WON';
  return (
    <div className="overlay">
      <div className="modal">
        <h2>{won ? '🎉 You Won!' : 'Game Over'}</h2>
        <p>{won ? 'You found the word:' : 'The correct word was:'}</p>
        <p className="answer">{solutionWord}</p>
        <button className="play-again" onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
}