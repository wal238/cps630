import React from "react";
import { useGameState } from "../GameStateContext";
import { useEffect } from "react";

const Scoreboard = () => {
    const { 
        userScore, 
        pcShipsRemanining,
        hits, 
        misses, 
        userShipsRemaining, 
        pcHits, 
        pcMisses,
        setAlertMessage,
    } = useGameState();

    useEffect(() => {
        if (pcShipsRemanining === 0) {
            setAlertMessage("You win!");
        } else if (userShipsRemaining === 0) {
            setAlertMessage("PC wins!");
        }
    }, [userScore, pcShipsRemanining, hits, misses, userShipsRemaining, pcHits, pcMisses, setAlertMessage]);

    return (
        <>
         <div className="flex justify-around items-center p-2 bg-blue-600 text-white text-sm rounded-md shadow">
            <div className="flex flex-col items-center justify-center space-y-1">
                <h2 className="text-md font-semibold">Your Stats</h2>
                <div>Enemy Ships: {pcShipsRemanining}</div>
                <div>Hits: {hits}</div>
                <div>Misses: {misses}</div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
                <h2 className="text-md font-semibold">PC Stats</h2>
                <div>Ships Left: {userShipsRemaining}</div>
                <div>Hits: {pcHits}</div>
                <div>Misses: {pcMisses}</div>
            </div>
        </div>
        </>
    );
}

export default Scoreboard;

