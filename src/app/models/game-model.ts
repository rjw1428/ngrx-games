import { Player } from './player-model';

export interface GameState {
    turnId: string,
    hasWon: Player,
    board: number[][],
    players: Player[],
    gameType: null | "ttt" | "c4"
    boardSize: number[],
    winChain: number,
    isGravity: boolean,
    playMode: string,
    self: string
}
