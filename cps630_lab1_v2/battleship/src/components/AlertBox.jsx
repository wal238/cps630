import React, { useState, useEffect } from "react";
import { useGameState } from "../GameStateContext";

const AlertBox = () => {
    const { alertMessage } = useGameState();
    const [displayMessage, setDisplayMessage] = useState(alertMessage);

    useEffect(() => {
        // Set a timeout to update the display message after a delay
        const timer = setTimeout(() => {
            setDisplayMessage(alertMessage);
        }, 1); // Delay in milliseconds

        // Clear the timeout if the component unmounts or the alertMessage changes
        return () => clearTimeout(timer);
    }, [alertMessage]);

    return (
        <>
            <div className={`p-4 text-white text-sm font-bold flex flex-col items-center justify-center space-y-2 rounded-lg shadow-md ${alertMessage === "YOU HAVE WON!" ? "bg-green-500" : alertMessage === "PC HAS WON!" ? "bg-red-500" : "bg-yellow-500"}`}>
                <div>{displayMessage}</div>
            </div>
        </>
    );
};

export default AlertBox;
