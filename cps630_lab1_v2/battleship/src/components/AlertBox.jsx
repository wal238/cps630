import React from "react";
import { useGameState } from "../GameStateContext";

const AlertBox = ({ text }) => {

    const { alertMessage} = useGameState();

    // Lets style the alert-box to make it more visible and give it a modern ui look


    return (
        <>
        <div
            style={{
                padding: 10,
                fontSize: 20,
                fontWeight: "bold",
                backgroundColor: "red",
                color: "white",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 50
            }}
        >
            {alertMessage}
        </div>
        
        </>
    )

}

export default AlertBox;