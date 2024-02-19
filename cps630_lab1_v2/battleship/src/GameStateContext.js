import React, { createContext, useState, useContext } from "react";

const GameStateContext = createContext();

export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [userTurn, setUserTurn] = useState(true);
  const [ships, setShips] = useState([
    { id: 2, size: 1, placed: false, orientation: "horizontal", position: null },
    { id: 6, size: 1, placed: false, orientation: "horizontal", position: null},
    { id: 3, size: 2, placed: false, orientation: "horizontal", position: null },
    { id: 4, size: 3, placed: false, orientation: "horizontal", position: null },
    { id: 5, size: 3, placed: false, orientation: "horizontal", position: null },
    { id: 1, size: 4, placed: false, orientation: "horizontal", position: null },
    // Add more ships with different sizes as needed
  ]);

  const [alertMessage, setAlertMessage] = useState("");


  const startGame = () => {
    setGameStarted(true);
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
    setAlertMessage
  };


  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
