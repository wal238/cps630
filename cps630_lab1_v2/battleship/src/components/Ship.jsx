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

  return (
    <div
      ref={drag}
      onClick={() => rotateShip(id)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: orientation === 'horizontal' ? size * 50 : 50,
        height: orientation === 'horizontal' ? 50 : size * 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
        backgroundColor: 'green',
      }}
    >
      🚢 
    </div>
  );
};

export default Ship;