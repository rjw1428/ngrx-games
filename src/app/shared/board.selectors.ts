import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GameState } from '../models/game-model';
import { AppState } from '../models/app-model';

export const selectGameState = createFeatureSelector<GameState>("game")


export const boardSelector = createSelector(
    selectGameState,
    game => game.board
)

export const playerSelector = createSelector(
    selectGameState,
    game => game.players
)

export const hasWonSelector = createSelector(
    selectGameState,
    game => game.hasWon
)

// export const currentTurnSelector = createSelector(
//     selectGameState,
//     game => getPlayerFromId(game, game.turnId)
// )

// export const turnSelector = createSelector(
//     selectGameState,
//     game => game.config.find(player => player.value == game.turnId)
// )

// const getPlayerFromId = (state: GameState, id: number) => {
//     return state.config.find(player => player.value === id)
// }