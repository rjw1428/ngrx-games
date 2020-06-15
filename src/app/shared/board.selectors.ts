import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GameState } from '../models/game-model';
import { AppState } from '../models/app-model';

export const selectGameState = createFeatureSelector<GameState>("game")


export const boardSelector = createSelector(
    selectGameState,
    game => game.board
)

export const turnSelector = createSelector(
    selectGameState,
    game => game.config.find(player => player.id == game.turnId)
)

export const configSelector = createSelector(
    selectGameState,
    game => game.config
)

export const hasWonSelector = createSelector(
    selectGameState,
    game => game.hasWon
)

export const currentTurnSelector = createSelector(
    selectGameState,
    game => getPlayerFromId(game, game.turnId)
)

const getPlayerFromId = (state: GameState, id: number) => {
    return state.config.find(player => player.id === id)
}