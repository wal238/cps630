import React from "react";
import { useGameState } from "../GameStateContext";

const AlertBox = ({ text }) => {

    const { alertMessage} = useGameState();

    // using if statements to check if alert message = "YOU HAVE WON!" or "PC HAS WON!" and then change the background color to green or red respectively   
    // also make it such tha
    return (
        <>
        <div className="p-4 bg-yellow-500 text-white text-sm font-bold flex flex-col items-center justify-center space-y-2 rounded-lg shadow-md">
            <div>{alertMessage}</div>
        </div>

        </>
    )

}

export default AlertBox;