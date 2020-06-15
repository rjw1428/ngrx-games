import { createReducer, on } from '@ngrx/store'
import * as Actions from './board.actions'
import { GameState } from '../models/game-model'

export const initialGameState: GameState = {
    hasWon: null,
    board: [],
    turnId: 1,
    config: []
}

export const boardReducer = createReducer(
    initialGameState,
    on(Actions.boardUpdated, (state, action) => {
        const next = state.board.map((row, rowInd) => {
            return rowInd === action.row
                ? row.map((val, colInd) => {
                    return colInd == action.col ? state.turnId : val
                })
                : row
        })
        return {
            ...state,
            turnId: state.turnId == 1 ? 2 : 1,
            board: next
        }
    }),

    on(Actions.initializeBoard, (state, action) => {
        return {
            ...state,
            hasWon: null,
            board: action.board,
            turnId: 1
        }
    }),

    on(Actions.playerWon, (state, action) => {
        return { 
            ...state, 
            hasWon: state.config.find(player => player.id == action.playerId) 
        }
    }),

    on(Actions.setPlayerConfig, (state, action) => {
        return { 
            ...state, 
            config: action.config 
        }
    })
)
