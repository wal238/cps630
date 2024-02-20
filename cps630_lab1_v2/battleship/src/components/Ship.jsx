import React from "react";
import { useDrag } from "react-dnd";

const Ship = ({ id, size, orientation, rotateShip, placed }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ship',
    item: { type: 'ship', id, size, orientation, placed },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const width = orientation === 'horizontal' ? size * 32 : 32;
  const height = orientation === 'horizontal' ? 32 : size * 32;

  return (
    <div className="relative">
    <div
      ref={drag}
      onClick={() => rotateShip(id)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: width,
        height: height,
        cursor: 'move',
        backgroundColor: 'green',
        border: '1px solid black',
      }}
      className="flex justify-center items-center font-bold text-2xl"
    >
      🚢
    </div>
  </div>
  );
};

export default Ship;