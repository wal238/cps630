import React from "react";
import { useDrag } from "react-dnd";

const Ship = ({ id, size, orientation, rotateShip }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'ship',
        item: { type: 'ship', id, size, orientation }, // Include the orientation here
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
          width: size * 50, // Each ship unit is 50 pixels wide
          height: 50, // Height is constant as per the cell size
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