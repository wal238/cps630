import { useDrop } from "react-dnd";
import React from "react";
import { useGameState } from "../GameStateContext";

const Cell = ({ onDrop, cellId, draggedShip }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ship",
    drop: (item, monitor) => {
      onDrop(cellId, item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const { board, ships } = useGameState();

  const [x, y] = cellId.split('-').map(Number);
  const cellValue = board[x][y];
  const isShipPart = cellValue !== null && cellValue !== 'hit' && cellValue !== 'miss';
  const isSunkShipPart = ships.some(ship => 
    ship.sunk && ship.position.some(pos => pos[0] === x && pos[1] === y)
  );
  

  let cellColor = "lightblue"; // Default color
  if (isSunkShipPart) {
    cellColor = "purple"; // Distinct color for sunk ship
  } else if (isShipPart) {
    cellColor = "green"; // Ship part
  } else if (cellValue === 'hit') {
    cellColor = "red"; // Hit
  } else if (cellValue === 'miss') {
    cellColor = "gray"; // Miss
  } else if (isOver) {
    cellColor = "yellow"; // Hovering over
  }

  const cellStyle = {
    width: 32,
    height: 32,
    border: "1px solid black",
    backgroundColor: cellColor,
    position: "relative",
  };

  return (
    <div ref={drop} style={cellStyle}>
    </div>
  );
};

export default Cell;
