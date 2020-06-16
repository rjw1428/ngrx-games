import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-model';
import { map } from 'rxjs/internal/operators/map';
import * as Actions from '../shared/board.actions'

@Injectable()
export class WinService {

  constructor(private store: Store<AppState>) { }

  checkWinConitions(chainSize: number) {
    return this.store.pipe(
      map(state => {
        if (!state.game.hasWon) {
          const hasWinningRow = this.checkAllRows(state.game.board, chainSize)
          const hasWinningCol = this.checkAllCols(state.game.board, chainSize)
          const hasWinningDiagnal = this.checkDiagnalWin(state.game.board, chainSize)

          if (hasWinningCol || hasWinningRow || hasWinningDiagnal) {
            const oppositeId = state.game.turnId == 1 ? 2 : 1
            this.store.dispatch(Actions.playerWon({
              playerId: oppositeId
            }))
          }
        }
      })
    )
  }

  checkNoMovesCondition() {
    return this.store.pipe(
      map(state => {
        if (!state.game.hasWon) {
          const hasFreeCells = state.game.board.map(row => {
            const hasFreeCell = row.includes(0)
            return hasFreeCell
          })
          return hasFreeCells.includes(true)
        }
      })
    )
  }

  checkAllRows(board: number[][], chainSize: number) {
    for (let rowIndx in board) {
      const row = board[rowIndx]
      const player1Streak = this.countOccurancesInArray(row, 1)
      const player2Streak = this.countOccurancesInArray(row, 2)
      if (player1Streak == chainSize || player2Streak == chainSize)
        return true

    }
    return false
  }

  checkAllCols(board: number[][], chainSize: number) {
    for (let colIndx in board[0]) {
      const col = board.map(row => row[colIndx])
      const player1Streak = this.countOccurancesInArray(col, 1)
      const player2Streak = this.countOccurancesInArray(col, 2)
      if (player1Streak == chainSize || player2Streak == chainSize)
        return true
    }
    return false
  }

  checkDiagnalWin(board: number[][], chainSize: number) {
    for (let rowIndx in board) {
      for (let colIndx in board[rowIndx]) {
        const cell = board[rowIndx][colIndx]
        if (cell) {
          const downStreak = this.traverseDiagnalForStreak(board, +rowIndx + 1, +colIndx + 1, 1, cell, 1)
          const upStreak = this.traverseDiagnalForStreak(board, +rowIndx - 1, +colIndx + 1, -1, cell, 1)
          if (upStreak == chainSize || downStreak == chainSize)
            return true
        }
      }
    }
    return false
  }

  traverseDiagnalForStreak(board: number[][], nextRow: number, nextCol: number, direction: number, val: number, count: number) {
    if (board.length - 1 < nextRow || nextRow < 0) return count
    if (board[0].length - 1 < nextCol || nextCol < 0) return count
    if (board[nextRow][nextCol] != val) return count
    return this.traverseDiagnalForStreak(board, nextRow + direction, nextCol + 1, direction, val, count + 1)
  }

  countOccurancesInArray(row: number[], val: number): number {
    let count = 0
    let max = 0
    row.forEach(cell => {
      cell == val ? count++ : count = 0;
      if (count > max) max = count;
    })
    return max
  }

  flipBoard(board: number[][]) {
    return board.reverse()
  }




  // checkAllRows(board: number[][], chainSize) {
  //   return board
  //     .map(row => this.checkSingleRowWin(row))
  //     .reduce((acc, cur) => acc < cur ? cur : acc, 0)
  // }

  // checkAllCols(board: number[][], chainSize) {
  //   const TBoard = this.transposeBoard(board)
  //   return this.checkAllRows(TBoard, chainSize)
  // }

  // // Returns the player number or 0
  // checkSingleRowWin(row: number[]) {
  //   return row.reduce((result, cell) => {
  //     return result == cell ? cell : 0
  //   }, row[0])
  // }

  // // Transpose board
  // transposeBoard(board: number[][]) {
  //   return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
  // }

  // // Checks for diagnal win
  // checkDiagnalWin(board: number[][]) {
  //   if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1])
  //     return 1
  //   else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1])
  //     return 1
  //   return 0
  // }
}
