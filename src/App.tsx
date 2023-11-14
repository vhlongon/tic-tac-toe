import { useState } from 'react';
import Confetti from 'react-confetti';
import './App.css';

type Player = 'X' | 'O' | null;

type SquareProps = {
  value: Player;
  onClick: () => void;
};

const initialBoard = Array(9).fill(null);

const calculateWinner = (squares: Player[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Square = ({ value, onClick }: SquareProps) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const App = () => {
  const [squares, setSquares] = useState<Player[]>(initialBoard);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (index: number) => () => {
    if (squares[index] ?? calculateWinner(squares)) {
      return;
    }

    setSquares(squares => {
      const newSquares = [...squares];
      newSquares[index] = xIsNext ? 'X' : 'O';
      return newSquares;
    });

    setXIsNext(xIsNext => !xIsNext);
  };

  const reset = () => {
    setSquares(initialBoard);
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);

  const winnerText = winner ? `${winner} wins!` : '';
  const status = !squares.filter(Boolean).length
    ? 'X stars'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className={`winner-text ${winnerText ? 'pop' : ''}`}>
        {winnerText}
      </div>
      <div className={`game-info ${winner ? 'hide' : ''}`}>
        <div>{status}</div>
      </div>

      <div className="game-board">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={handleClick(index)} />
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
      {winner && <Confetti />}
    </div>
  );
};

export default App;
