import { Player } from './player-model';

export interface GameState {
    turnId: number,
    hasWon: Player,
    board: number[][],
    config: Player[],
    gameType: null | "ttt" | "c4"
    boardWidth: number,
    boardHeight: number,
    winChain: number,
    isGravity: boolean,
}
