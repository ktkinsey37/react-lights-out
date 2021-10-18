import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  // WORKING
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++){
      initialBoard.push(Array.apply(null, Array(ncols)).map((x) => Math.random()<=chanceLightStartsOn))
    }
    return initialBoard;
  }

  // WORKS
  function hasWon() {
    // isFalse will return true if a value is false
    const isFalse = (x) => (x == false)

    return board.every((x) => x.every(isFalse))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      let newBoard = oldBoard.map((arr) => [...arr])
    
      flipCell(y, x, newBoard)
      flipCell(y, x+1, newBoard)
      flipCell(y, x-1, newBoard)
      flipCell(y+1, x, newBoard)
      flipCell(y-1, x, newBoard)

      return newBoard
    });
  }

  if (hasWon()){
    return <div>You won!</div>
  } else {

  
  // if the game is won, just show a winning msg & render nothing else
  let tableRows = []
  // TODO
  for (let i = 0; i < nrows; i++){
    let row = []
    for (let j = 0; j < ncols; j++){
      let coord = `${i}-${j}`
      row.push(<Cell key={coord} flipCellsAround={() => flipCellsAround(coord)} isLit={board[i][j]}/>)
    }
    tableRows.push(<tr>{row}</tr>)
  }

  const tableBoard = <table>{tableRows}</table>

  return tableBoard
}}

export default Board;
