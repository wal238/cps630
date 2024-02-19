import React from "react";
import "./App.css";
import Board from "./components/Board";
import PCBoard from "./components/PCBoard";
import { GameStateProvider } from "./GameStateContext";
import Button from "./components/Button";
import AlertBox from "./components/AlertBox";
import Score from "./components/Score";

function App() {
  return (
    <GameStateProvider>
       <h1>CPS630 Lab1: Battleship</h1>
       <AlertBox />
       <Score />
      <div className="app-container">
        <div className="board-container">
          <Board gameStarted={false} />
        </div>
        <div className="board-container">
          <PCBoard />
        </div>
      </div>
      <Button />
      
    </GameStateProvider>
  );
}

export default App;
