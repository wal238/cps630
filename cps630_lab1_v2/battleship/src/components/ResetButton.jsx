import React from "react";
import { useGameState } from "../GameStateContext";

const ResetButton = () => {
    const { resetGame } = useGameState();

    return (
        <button
            onClick={resetGame}
            className="px-6 py-2 text-lg font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
            Reset Game
        </button>
    );
}

export default ResetButton;
