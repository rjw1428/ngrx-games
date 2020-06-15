import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-model';
import { map } from 'rxjs/internal/operators/map';
import * as Actions from '../shared/board.actions'

@Injectable()
export class WinService {

  constructor(private store: Store<AppState>) { }

  checkWinConitions() {
    return this.store.pipe(
      map(state => {
        if (!state.game.hasWon) {
          const hasWinningRow = this.checkAllRows(state.game.board)
          const hasWinningCol = this.checkAllCols(state.game.board)
          const hasWinningDiagnal = this.checkDiagnalWin(state.game.board)

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

  checkAllRows(board: number[][]) {
    return board
      .map(row => this.checkSingleRowWin(row))
      .reduce((acc, cur) => acc < cur ? cur : acc, 0)
  }
  
  checkAllCols(board: number[][]) {
    const TBoard = this.transposeBoard(board)
    return this.checkAllRows(TBoard)
  }

  // Returns the player number or 0
  checkSingleRowWin(row: number[]) {
    return row.reduce((result, cell) => {
      return result == cell ? cell : 0
    }, row[0])
  }

  // Transpose board
  transposeBoard(board: number[][]) {
    return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
  }

  // Checks for diagnal win
  checkDiagnalWin(board: number[][]) {
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1])
      return 1
    else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1])
      return 1
    return 0
  }
}
