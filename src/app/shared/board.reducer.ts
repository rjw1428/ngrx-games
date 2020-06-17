import { createReducer, on } from '@ngrx/store'
import * as Actions from './board.actions'
import { GameState } from '../models/game-model'

export const initialGameState: GameState = {
    hasWon: null,
    board: [],
    turnId: 1,
    config: [],
    boardWidth: 0,
    boardHeight: 0,
    isGravity: false,
    gameType: null,
    winChain: 0
}


export const boardReducer = createReducer(
    initialGameState,
    on(Actions.gameSelected, (state, action) => {
        switch (action.gameTypeId) {
            case "ttt": {
                return {
                    ...state,
                    boardHeight: 3,
                    boardWidth: 3,
                    isGravity: false,
                    winChain: 3,
                    gameType: action.gameTypeId
                }
            }
            case "c4": {
                return {
                    ...state,
                    boardHeight: 6,
                    boardWidth: 7,
                    isGravity: true,
                    winChain: 4,
                    gameType: action.gameTypeId
                }
            }
        }
    }),
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
