import React from "react";
import { useGameState } from "../GameStateContext";

const Button = () => {
    const { ships, startGame, setAlertMessage } = useGameState();

    const allShipPlaced = ships.every((ship) => ship.placed);

    const handleStartGame = () => {
        if (allShipPlaced) {
            setAlertMessage("GAME HAS STARTED!");
            startGame();
        } else {
            setAlertMessage("Please place all ships before starting the game");
        }
    }

    return (
        <button
            onClick={handleStartGame}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition duration-200 ease-in-out"
        >
            Start Game
        </button>
    );
};

export default Button;
