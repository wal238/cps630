import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Cell from "./Cell";
import Ship from "./Ship";
import { useGameState } from "../GameStateContext";



const Board = () => {
  const { board, setBoard, ships, setShips, gameStarted, setAlertMessage, pcAttack } = useGameState();

  
  const [draggedShip, setDraggedShip] = useState(null);

  const rotateShip = (shipId) => {
    setShips(
      ships.map((ship) =>
        ship.id === shipId
          ? {
              ...ship,
              orientation:
                ship.orientation === "horizontal" ? "vertical" : "horizontal",
            }
          : ship
      )
    );
  };

  const getShipCoordinates = (startX, startY, size, orientation) => {
    const coordinates = [];
    for (let i = 0; i < size; i++) {
      if (orientation === "horizontal") {
        coordinates.push([startX, startY + i]);
      } else {
        coordinates.push([startX + i, startY]);
      }
    }
    return coordinates;
  };
  
  const placeShip = (cellId, ship) => {
    if (gameStarted) {
      setAlertMessage("Game has already started, unable to place battleship");
      return;
    }
  
    const [startX, startY] = cellId.split("-").map(Number);
    const newCoordinates = getShipCoordinates(startX, startY, ship.size, ship.orientation);
  
    // Check for overlap or out of bounds
    const isOverlap = newCoordinates.some(([x, y]) => {
      return (
        x < 0 ||
        x >= 10 ||
        y < 0 ||
        y >= 10 ||
        (board[x][y] !== null && board[x][y] !== ship.id)
      );
    });
  
    if (isOverlap) {
      setAlertMessage("Cannot place ship at this location");
      return;
    }
  
    // Clear the old position if the ship is being repositioned
    if (ship.placed) {
      const oldPosition = ship.position;
      setBoard((prevBoard) => {
        const newBoard = prevBoard.map((row) => [...row]);
        oldPosition.forEach(([x, y]) => {
          newBoard[x][y] = null;
        });
        return newBoard;
      });
    }
  
    // Place the ship at the new position
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      newCoordinates.forEach(([x, y]) => {
        newBoard[x][y] = ship.id;
      });
      return newBoard;
    });
  
    // Update the ship's placed status and position
    setShips((prevShips) =>
      prevShips.map((s) =>
        s.id === ship.id ? { ...s, placed: true, position: newCoordinates } : s
      )
    );
  };

  console.log(ships);
  console.log(board);


  return (
    <DndProvider backend={HTML5Backend}>
  <div className="flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold text-center mb-4">Player</h1>
    <div className="grid grid-cols-10">
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
  </div>
  
  <div className="flex flex-row flex-wrap justify-start items-start mt-4">
    {ships.map((ship) => (
      <Ship
        key={ship.id}
        id={ship.id}
        size={ship.size}
        orientation={ship.orientation}
        placed={ship.placed}
        rotateShip={rotateShip}
      />
    ))}
  </div>
</DndProvider>


  );
};

export default Board;
