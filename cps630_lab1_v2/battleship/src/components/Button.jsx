import React from "react";
import { useGameState } from "../GameStateContext";

const Button = ({ text, onClick }) => {
    const { ships, startGame, gameStarted, setAlertMessage } = useGameState();

    const allShipPlaced = ships.every((ship) => ship.placed);

    const handleStartGame = () => {
        if (allShipPlaced) {
            setAlertMessage("GAME HAS STARTED!");
            startGame();
        } else {
            setAlertMessage("Please place all ships before starting the game");
        }
    }

    //The code below I wanna make a nicely styled button with a modern UI look and feel with hovering as well
    
    return (
        <>
        <button
            onClick={onClick}
            style={{
                padding: 10,
                fontSize: 20,
                fontWeight: "bold",
                backgroundColor: "blue",
                color: "white",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 50
            }}
            > Start Game</button>
        </>
    );
};

export default Button;