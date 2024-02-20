import React, { createContext, useState, useContext } from "react";

const GameStateContext = createContext();

export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userTurn, setUserTurn] = useState(true);
  const [ships, setShips] = useState([
    {
      id: 2,
      size: 1,
      placed: false,
      orientation: "horizontal",
      health: 1,
      position: null,
      coordinates: [],
    },
    {
      id: 6,
      size: 1,
      placed: false,
      orientation: "horizontal",
      health: 1,
      position: null,
      coordinates: [],
    },
    {
      id: 3,
      size: 2,
      placed: false,
      orientation: "horizontal",
      health: 2,
      position: null,
      coordinates: [],
    },
    {
      id: 4,
      size: 3,
      placed: false,
      orientation: "horizontal",
      health: 3,
      position: null,
      coordinates: [],
    },
    {
      id: 5,
      size: 3,
      placed: false,
      orientation: "horizontal",
      health: 3,
      position: null,
      coordinates: [],
    },
    {
      id: 1,
      size: 4,
      placed: false,
      orientation: "horizontal",
      health: 4,
      position: null,
      coordinates: [],
    },
    // Add more ships with different sizes as needed
  ]);
  const [board, setBoard] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill(null))
  );

  const [userScore, setUserScore] = useState(0);
  const [pcShipsRemanining, setPcShipsRemanining] = useState(6);

  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  const [userShipsRemaining, setUserShipsRemaining] = useState(6);
  const [pcHits, setPcHits] = useState(0);
  const [pcMisses, setPcMisses] = useState(0);

  const [isPcBoardDisabled, setIsPcBoardDisabled] = useState(false);

  const [pcBoard, setPcBoard] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill(null))
  );

  const [pcShips, setPcShips] = useState();

  const [alertMessage, setAlertMessage] = useState(
    "Welcome to BattleShip! Place your ships on the board. Click the button to start the game."
  );

  const startGame = () => {
    setGameStarted(true);
  };

  const pcAttack = () => {
    let attacked = false;
    while (!attacked) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (board[x][y] !== "hit" && board[x][y] !== "miss") {
        if (typeof board[x][y] === "number") {
          // Ship is hit
          const shipId = board[x][y];
          board[x][y] = "hit";
          setPcHits((prev) => prev + 1);

          // Find the ship and decrease its health
          const updatedShips = ships.map((ship) => {
            if (ship.id === shipId) {
              ship.health -= 1;
              if (ship.health === 0) {
                ship.sunk = true;
                setUserShipsRemaining((prev) => prev - 1);
                // Check if all ships are sunk
                if (pcShipsRemanining - 1 === 0) {
                  setAlertMessage("All PC ships have been sunk! You win!");
                  // Additional logic to handle game end
                }
              }
            }
            return ship;
          });
          setShips(updatedShips);
        } else {
          // Miss
          board[x][y] = "miss";
          setPcMisses((prev) => prev + 1);
        }
        attacked = true;
      }
    }

    setBoard([...board]);
    setIsPcBoardDisabled(false);
  };

  // Create a resetGame function that resets all the states to their initial values
  const resetGame = () => {
    setGameStarted(false);
    setUserTurn(true);
    setShips([
      {
        id: 2,
        size: 1,
        placed: false,
        orientation: "horizontal",
        health: 1,
        position: null,
        coordinates: [],
      },
      {
        id: 6,
        size: 1,
        placed: false,
        orientation: "horizontal",
        health: 1,
        position: null,
        coordinates: [],
      },
      {
        id: 3,
        size: 2,
        placed: false,
        orientation: "horizontal",
        health: 2,
        position: null,
        coordinates: [],
      },
      {
        id: 4,
        size: 3,
        placed: false,
        orientation: "horizontal",
        health: 3,
        position: null,
        coordinates: [],
      },
      {
        id: 5,
        size: 3,
        placed: false,
        orientation: "horizontal",
        health: 3,
        position: null,
        coordinates: [],
      },
      {
        id: 1,
        size: 4,
        placed: false,
        orientation: "horizontal",
        health: 4,
        position: null,
        coordinates: [],
      },
    ]);
    setBoard(
      Array(10)
        .fill()
        .map(() => Array(10).fill(null))
    );
    setUserScore(0);
    setPcShipsRemanining(6);
    setHits(0);
    setMisses(0);
    setUserShipsRemaining(6);
    setPcHits(0);
    setPcMisses(0);
    setIsPcBoardDisabled(false);
    setPcBoard(
      Array(10)
        .fill()
        .map(() => Array(10).fill(null))
    );
    setPcShips();
    setAlertMessage(
      "Welcome to BattleShip! Place your ships on the board. Click the button to start the game."
    );
  };

  const value = {
    gameStarted,
    setGameStarted,
    userTurn,
    setUserTurn,
    startGame,
    setShips,
    ships,
    alertMessage,
    setAlertMessage,
    pcBoard,
    setPcBoard,
    pcShips,
    setPcShips,
    userScore,
    setUserScore,
    pcShipsRemanining,
    setPcShipsRemanining,
    hits,
    setHits,
    misses,
    setMisses,
    board,
    setBoard,
    pcAttack,
    isPcBoardDisabled,
    setIsPcBoardDisabled,
    pcHits,
    setPcHits,
    pcMisses,
    setPcMisses,
    userShipsRemaining,
    isGameOver,
    setIsGameOver,
    resetGame
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
