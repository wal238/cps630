import React from "react";
import { useState, useEffect } from "react";
import { useGameState } from "../GameStateContext";
import "./PCBoard.css";

const PCBoard = () => {
  const [pcBoard, setPcBoard] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill(null))
  );


  const { gameStarted, setAlertMessage } = useGameState();

  const placeShipsRandomly = () => {
    let newBoard = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
    const shipSizes = [1, 1, 2, 3, 3, 4];

    shipSizes.forEach((size) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

        if (canPlaceShip(newBoard, x, y, size, orientation)) {
          newBoard = placeShip(newBoard, x, y, size, orientation);
          placed = true;
        }
      }
    });
    setPcBoard(newBoard);
  };

  const canPlaceShip = (board, row, col, size, orientation) => {
    if (orientation === "horizontal" && col + size > 10) {
      return false;
    }
    if (orientation === "vertical" && row + size > 10) {
      return false;
    }
    for (let i = 0; i < size; i++) {
      if (orientation === "horizontal" && board[row][col + i] !== null) {
        return false;
      }
      if (orientation === "vertical" && board[row + i][col] !== null) {
        return false;
      }
    }
    return true;
  };

  const placeShip = (board, row, col, size, orientation) => {
    const newBoard = board.map((row) => [...row]);
    for (let i = 0; i < size; i++) {
      if (orientation === "horizontal") {
        newBoard[row][col + i] = size;
      } else {
        newBoard[row + i][col] = size;
      }
    }
    return newBoard;
  };

  const handleCellClick = (row, col) => {
    if (!gameStarted) {
      setAlertMessage("Game has not started yet! Don't attempt to cheat!");
      return;
    }
    // Check if the cell has already been hit
    if (pcBoard[row][col] === 'hit' || pcBoard[row][col] === 'miss') {
      setAlertMessage("You've already hit this location!");
      return;
    }
  
    // Check if there's a ship at the clicked location
    if (pcBoard[row][col] === 'ship') {
      // Update the board to indicate a hit
      const updatedBoard = [...pcBoard];
      updatedBoard[row][col] = 'hit';
      setPcBoard(updatedBoard);
      // Additional logic for hit (e.g., checking if the ship is sunk)
    } else {
      // Update the board to indicate a miss
      const updatedBoard = [...pcBoard];
      updatedBoard[row][col] = 'miss';
      setPcBoard(updatedBoard);
    }
  
    // Logic for changing turns, etc.
  };
  

  useEffect(() => {
    placeShipsRandomly();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <>
    <h1> PC Board</h1>
    <div className="board">
    {pcBoard.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className="cell"
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {/* You can add additional rendering logic here based on the cell state */}
          </div>
        ))}
      </div>
    ))}
  </div>
  </>
);
};

export default PCBoard;
