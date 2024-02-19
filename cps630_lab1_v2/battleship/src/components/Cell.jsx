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

  const { board } = useGameState();

  const [x, y] = cellId.split('-').map(Number);
  const cellValue = board[x][y];
  const isShipPart = cellValue !== null && cellValue !== 'hit' && cellValue !== 'miss';

  // Determine cell color based on its status
  let cellColor = "lightblue";
  if (isShipPart) {
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
      {canDrop && !isOver && "🟩"}
      {!canDrop && isOver && "🟥"}
    </div>
  );
};

export default Cell;
