import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player } from '../models/player-model';

const boardUpdated = createAction(
    "[Move Component] Move Made",
    props<{row: number, col: number}>()
)

const initializeBoard = createAction(
    "[Board Component] Create Board",
    props<{board: number[][]}>()
)

const playerWon = createAction(
    "[Move Component] Player Wins",
    props<{playerId: number}>()
)

const getPlayerConfig = createAction(
    "[Board Component] Get Player Configs",
)

const setPlayerConfig = createAction(
    "[Board Effect] Set Player Configs",
    props<{config: Player[]}>()
)

export {
    boardUpdated,
    initializeBoard,
    playerWon,
    getPlayerConfig,
    setPlayerConfig
}