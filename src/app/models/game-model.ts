import { Player } from './player-model';

export interface GameState {
    room: string,
    turnId: string,
    hasWon: Player,
    board: number[][],
    players: Player[],
    gameType: string
    boardSize: number[],
    winChain: number,
    isGravity: boolean,
    playMode: string,
    self: string,
    creator: string
}
