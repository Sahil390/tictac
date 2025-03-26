import React, { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const hclick = (index) => {
    if (squares[index] || cwin(squares)) {
      return;
    }
    const nsquare = squares.slice();
    nsquare[index] = isXNext ? 'X' : 'O';
    setSquares(nsquare);
    setIsXNext(!isXNext);
  };

  const winner = cwin(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const renderSquare = (index) => {
    return <Square value={squares[index]} onClick={() => hclick(index)} />;
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function cwin(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function ResetButton({ onReset }) {
  return (
    <button className="reset-button" onClick={onReset}>
      Reset
    </button>
  );
}

function App() {
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board key={key} />
      <ResetButton onReset={handleReset} />
    </div>
  );
}
export default App;
