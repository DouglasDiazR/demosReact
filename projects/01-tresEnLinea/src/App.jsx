import { useState } from "react";
import { Square } from "./components/square";
import { TURNS } from "./utils/constants";
import { checkWinner, checkEndGame } from "./utils/board";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from "./utils/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  // null => no hay ganador; false => empate;
  const [winner, SetWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    SetWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    //no actualizamos esta posición si ya tiene algo
    if (board[index] || winner) return;

    //actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      SetWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      SetWinner(false); // empate
    }
  };

  return (
    <main className="board">
      <h1>Tres en línea</h1>
      <button onClick={resetGame}>Resetear</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
