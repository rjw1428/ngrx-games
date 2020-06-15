import { Player } from './player-model';

export interface GameState {
    turnId: number,
    hasWon: Player,
    board: number[][],
    config: Player[]
}
