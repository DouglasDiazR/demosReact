import { WINNER_COMBOS } from "./constants";

export const checkWinner = (boardToCheck) => {
  //revisamos todas las combinaciones ganadores
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;

    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  //si no hay ganador
  return null;
};

//revisamos si hay un empate, si no hay más espacios vacíos en el tablero
export const checkEndGame = (newBoard) => {
  return newBoard.every((Square) => Square !== null);
};
