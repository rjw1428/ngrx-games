import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GravityService {
  constructor() { }

  applyGravity(board: number[][], moveRow, moveCol) {
    const nextRow = moveRow + 1
    if (board[moveRow][moveCol]  && !moveRow) return -1
    if (board[moveRow][moveCol]) return this.applyGravity(board, 0, moveCol)
    if (nextRow >= board.length) return moveRow
    if (board[nextRow][moveCol]) return moveRow
    return this.applyGravity(board, nextRow, moveCol)
  }
}
