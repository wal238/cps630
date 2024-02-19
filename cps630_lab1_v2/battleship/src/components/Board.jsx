import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Cell from "./Cell";
import Ship from "./Ship";
import { useGameState } from "../GameStateContext";
import "./Board.css";

const Board = () => {
  const { ships, setShips, gameStarted, setAlertMessage } = useGameState();

  const [board, setBoard] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill(null))
  );
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

  const placeShip = (cellId, ship) => {
    if (gameStarted) {
      setAlertMessage("Game has already started unable to place battleship");
      return;
    }

    console.log("cellID:", cellId);
    console.log("ship:", ship);

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

    // Calculate the new position
    const cells = [];
    const [startX, startY] = cellId.split("-").map(Number);

    for (let i = 0; i < ship.size; i++) {
      if (ship.orientation === "horizontal") {
        cells.push([startX, startY + i]);
      } else {
        cells.push([startX + i, startY]);
      }
    }

    // Check for overlap or out of bounds
    const isOverlap = cells.some(([x, y]) => {
      return (
        x < 0 ||
        x >= 10 ||
        y < 0 ||
        y >= 10 ||
        (board[x][y] !== null && board[x][y] !== ship.id)
      );
    });

    if (isOverlap) {
      console.log(`Cannot place ship at cell ${cellId}`);
      setAlertMessage("Cannot place ship at this location");
      return;
    }
    console.log("Cells:", cells);
    if (!cells) {
      console.log("Cells is null");
      return;
    }
    // Place the ship at the new position
    const newBoard = board.map((row) => [...row]);
    cells.forEach(([x, y]) => {
      newBoard[x][y] = ship.id;
    });

    setBoard(newBoard);

    // Update the ship's placed status and position
    console.log("THIS IS STARTX, and STARTy", startX, startY);
    setShips((prevShips) =>
      prevShips.map((s) =>
        s.id === ship.id ? { ...s, placed: true, position: cells } : s
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h1>Player Board</h1>
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
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }} >
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
