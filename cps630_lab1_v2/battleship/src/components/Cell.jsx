import { useDrop } from "react-dnd";
import React from "react";

const Cell = ({ onDrop, cellId, isShipPart, board, draggedShip }) => {
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


  const cellStyle = {
    width: 50,
    height: 50,
    border: "1px solid black",
    backgroundColor: isShipPart ? "green" : (isOver ? "yellow" : "lightblue"),
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
