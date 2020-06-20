import { createAction, props } from '@ngrx/store';
import { Player } from '../models/player-model';

export const gameSelected = createAction(
    "[Home Component] Game Type Selected",
    props<{ gameTypeId: string, player: Player }>()
)

export const boardUpdated = createAction(
    "[Move Component] Move Made",
    props<{ row: number, col: number }>()
)

export const initializeBoard = createAction(
    "[Board Component] Create Board",
    props<{ board: number[][] }>()
)

export const playerWon = createAction(
    "[Move Component] Player Wins",
    props<{ player: Player }>()
)

export const getPlayerConfig = createAction(
    "[Board Component] Get Player Configs",
)

export const setPlayers = createAction(
    "[Player Service] Set Player Configs",
    props<{ players: Player[] }>()
)

export const playmodeSelected = createAction(
    "[Home Component] Set Game Mode",
    props<{ mode: string }>()
)

export const turnChanged = createAction(
    "[Player Service (From Server)] Next Turn",
    props<{ id: string, name: string }>()
)

export const setSelfId = createAction(
    "[Player Service (On Join Game)] Setting self ID",
    props<{ self: string }>()
)

export const updateBoard = createAction(
    "[Player Service (From Server)] Update Board",
    props<{ row: number, col: number, value: number }>()
)

