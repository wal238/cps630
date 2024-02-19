import React from "react";
import { useGameState } from "../GameStateContext";

const AlertBox = ({ text }) => {

    const { alertMessage} = useGameState();

    // Lets style the alert-box to make it more visible and give it a modern ui look

    //Let's style the alert-box make it looks nicer and smaller and modern ui look using tailwindcss
    return (
        <>
        <div className="p-4 bg-green-500 text-white text-sm font-bold flex flex-col items-center justify-center space-y-2 rounded-lg shadow-md">
            <div>{alertMessage}</div>
        </div>

        </>
    )

}

export default AlertBox;