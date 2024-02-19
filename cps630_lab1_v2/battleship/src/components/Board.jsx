import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Cell from "./Cell";
import Ship from "./Ship";

const Board = () => {
  const [ships, setShips] = useState([
    { id: 2, size: 1, placed: false, orientation: "horizontal" },
    { id: 6, size: 1, placed: false, orientation: "horizontal"},
    { id: 3, size: 2, placed: false, orientation: "horizontal" },
    { id: 4, size: 3, placed: false, orientation: "horizontal" },
    { id: 5, size: 3, placed: false, orientation: "horizontal" },
    { id: 1, size: 4, placed: false, orientation: "horizontal" },
    // Add more ships with different sizes as needed
  ]);
  const [board, setBoard] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill(null))
  );
  const [draggedShip, setDraggedShip] = useState(null);

  const rotateShip = (shipId) => {
    setShips(ships.map(ship => ship.id === shipId
      ? { ...ship, orientation: ship.orientation === 'horizontal' ? 'vertical' : 'horizontal' }
      : ship
    ));
  };

  const placeShip = (cellId, ship) => {
    // Calculate the cells the ship would occupy based on its size and position
    const cells = [];
    const [startX, startY] = cellId.split("-").map(Number); // Assuming cellId is in format 'x-y'
    setDraggedShip(ship);
    for (let i = 0; i < ship.size; i++) {
      console.log(ship.orientation)
      if (ship.orientation === "horizontal")
      {
       cells.push([startX, startY + i]);
      }
      else
      {
       cells.push([startX + i, startY]);
      }
    }

    // Check if any of the cells are already occupied or out of bounds
    const isOverlap = cells.some(([x, y]) => {
      return x < 0 || x >= 10 || y < 0 || y >= 10 || board[x][y] !== null;
    });

    if (isOverlap) {
      // Do not allow the ship to be placed
      console.log(`Cannot place ship at cell ${cellId}`);
    } else {
      // Place the ship
      const newBoard = [...board];
      cells.forEach(([x, y]) => {
        newBoard[x][y] = ship.id; // Store the ship's id in the board
      });
      setBoard(newBoard);

      // Update the ship's placed status
      setShips(
        ships.map((s) => (s.id === ship.id ? { ...s, placed: true } : s))
      );

      console.log(`Placing ship at cell ${cellId}`);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
      {ships.map(ship => !ship.placed && (
    <Ship
        key={ship.id}
        id={ship.id}
        size={ship.size}
        orientation={ship.orientation}
        rotateShip={rotateShip}
    />
))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "550px" }}>
      {board.flat().map((cell, i) => {
  const x = Math.floor(i / 10);
  const y = i % 10;
  return (
    <Cell
      key={i}
      cellId={`${x}-${y}`}
      onDrop={placeShip}
      isShipPart={cell !== null}
      draggedShip={draggedShip}
      board={board}
    />
  );
})}

      </div>
    </DndProvider>
  );
};

export default Board;
