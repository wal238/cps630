import './App.css';
import Board from './components/Board';

function App() {
  return (
    <>
    <h1> CPS630 Lab1: Battleship</h1>
    <Board gameStarted={false} />
    </>
  );
}

export default App;
