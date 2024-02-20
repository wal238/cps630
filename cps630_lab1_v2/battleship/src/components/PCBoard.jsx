import React from "react";
import { useEffect } from "react";
import { useGameState } from "../GameStateContext";

const PCBoard = () => {
  const {
    gameStarted,
    setAlertMessage,
    pcBoard,
    setPcBoard,
    pcShips,
    setPcShips,
    userScore,
    setUserScore,
    pcShipsRemanining,
    setPcShipsRemanining,
    isPcBoardDisabled,
    setIsPcBoardDisabled,
    pcAttack,
    isGameOver
  } = useGameState();
  const { hits, setHits, misses, setMisses } = useGameState();

  const placeShipsRandomly = () => {
    let newBoard = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
    const shipSizes = [1, 1, 2, 2, 3, 4];
    let shipsData = [];
    let shipId = 1;

    shipSizes.forEach((size) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

        if (canPlaceShip(newBoard, x, y, size, orientation)) {
          newBoard = placeShip(newBoard, x, y, size, orientation, shipId);

          shipsData.push({
            id: shipId,
            size: size,
            health: size,
            coordinates: getShipCoordinates(newBoard, shipId),
            sunk: false,
          });

          placed = true;
          shipId++;
        }
      }
    });

    setPcBoard(newBoard);
    setPcShips(shipsData);
  };

  const isCellPartOfSunkShip = (row, col, pcShips) => {
    // Ship of pcShips is not iterable help implement this function
    for (const ship of pcShips) {
      if (ship.sunk) {
        const isPartOfShip = ship.coordinates.some(coord => coord.row === row && coord.col === col);
        if (isPartOfShip) {
          return true;
        }
      }
    }
    return false;
  };
  

  const getShipCoordinates = (board, shipId) => {
    let coordinates = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === shipId) {
          coordinates.push({ row, col });
        }
      }
    }
    return coordinates;
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

  const placeShip = (board, row, col, size, orientation, shipId) => {
    const newBoard = board.map((row) => [...row]);
    for (let i = 0; i < size; i++) {
      if (orientation === "horizontal") {
        newBoard[row][col + i] = shipId;
      } else {
        // vertical
        newBoard[row + i][col] = shipId;
      }
    }
    return newBoard;
  };

  const handleCellClick = (row, col) => {
    if (!gameStarted) {
      setAlertMessage("Game has not started yet! Don't attempt to cheat!");
      return;
    }
  
    if (isPcBoardDisabled) {
      setAlertMessage("PC Board is disabled. Please wait for PC to finish its turn.");
      return;
    }
  
    if (pcShipsRemanining === 0) {
      setAlertMessage("You've already won! Game over!");
      return;
    }
  
    const cell = pcBoard[row][col];
    if (cell === "hit" || cell === "miss") {
      setAlertMessage(`You've already hit this location! ${row}, ${col}`);
      return;
    }
  
    let isHit = false;
    const updatedBoard = pcBoard.map((r, rowIndex) => 
      r.map((c, colIndex) => {
        if (row === rowIndex && col === colIndex) {
          if (typeof c === "number") {
            isHit = true;
            return "hit";
          } else {
            return "miss";
          }
        }
        return c;
      })
    );
  
    setPcBoard(updatedBoard);
  
    if (isHit) {
      setAlertMessage("You hit a ship!");
      setHits(hits + 1);
  
      const updatedShips = pcShips.map((ship) => {
        if (ship.id === cell) {
          ship.health -= 1;
          if (ship.health === 0) {
            ship.sunk = true;
            setAlertMessage("You sunk a ship!");
            setPcShipsRemanining(pcShipsRemanining - 1);
            setUserScore(userScore + 1);
          }
        }
        return ship;
      });
  
      setPcShips(updatedShips);
    } else {
      setAlertMessage("You missed!");
      setMisses(misses + 1);
      setIsPcBoardDisabled(true);
      pcAttack();
    }
  };
  

  useEffect(() => {
    placeShipsRandomly();
  }, [isGameOver]); // Empty dependency array to run only once on component mount

  // Lets recreate and restyle whatever is below make the grid 10x 10 also make the grid cells 35x35x
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">PC Board</h1>
      <div className="grid grid-cols-10">
      {pcBoard.map((row, rowIndex) => {
  return row.map((cell, colIndex) => {
    let cellColorClass = "bg-sky-200 hover:bg-sky-100"; // Default color

    if (cell === "hit") {
      cellColorClass = "bg-red-500"; // Hit
    } else if (cell === "miss") {
      cellColorClass = "bg-gray-300"; // Miss
    }

    // Check if the cell is part of a sunk ship
    if ( pcShips && isCellPartOfSunkShip(rowIndex, colIndex, pcShips)) {
      cellColorClass = "bg-purple-500"; // Distinct color for sunk ship
    }

    return (
      <div
        key={`${rowIndex}-${colIndex}`}
        className={`h-8 w-8 cursor-pointer border border-black ${cellColorClass}`}
        onClick={() => handleCellClick(rowIndex, colIndex)}
      ></div>
    );
  });
})}
      </div>
    </>
  );
};

export default PCBoard;
