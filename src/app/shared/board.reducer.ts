import { createReducer, on } from '@ngrx/store'
import { GameState } from '../models/game-model'
import { Actions } from './board.action-types'
export const initialGameState: GameState = {
    hasWon: null,
    board: [],
    turnId: "",
    players: [],
    boardSize: [0, 0],
    isGravity: false,
    gameType: null,
    winChain: 0,
    playMode: "",
    self: null
}


export const boardReducer = createReducer(
    initialGameState,
    on(Actions.gameSelected, (state, action) => {
        switch (action.gameTypeId) {
            case "ttt": {
                return {
                    ...state,
                    boardSize: [3, 3],
                    isGravity: false,
                    winChain: 3,
                    gameType: action.gameTypeId
                }
            }
            case "c4": {
                return {
                    ...state,
                    boardSize: [7, 6],
                    isGravity: true,
                    winChain: 4,
                    gameType: action.gameTypeId
                }
            }
        }
    }),
    // on(Actions.boardUpdated, (state, action) => {
    //     const next = state.board.map((row, rowInd) => {
    //         return rowInd === action.row
    //             ? row.map((val, colInd) => {
    //                 return colInd == action.col ? state.players.findIndex(player=>player.id==state.turnId)+1 : val
    //             })
    //             : row
    //     })
    //     return {
    //         ...state,
    //         turnId: state.players.find(player=>player.id!=state.turnId).id,
    //         board: next,
    //     }
    // }),

    on(Actions.initializeBoard, (state, action) => {
        return {
            ...state,
            hasWon: null,
            board: action.board,
        }
    }),

    on(Actions.playerWon, (state, action) => {
        return {
            ...state,
            hasWon: action.player
        }
    }),

    on(Actions.setPlayers, (state, action) => {
        return {
            ...state,
            players: action.players
        }
    }),
    on(Actions.playmodeSelected, (state, action) => {
        return {
            ...state,
            playMode: action.mode
        }
    }),
    on(Actions.turnChanged, (state, action) => {
        return {
            ...state,
            turnId: action.id
        }
    }),
    on(Actions.setSelfId, (state, action) => {
        return {
            ...state,
            self: action.self
        }
    }),
    on(Actions.updateBoard, (state, action) => {
        const next = state.board.map((row, rowInd) => {
            return rowInd === action.row
                ? row.map((val, colInd) => {
                    return colInd == action.col ? action.value : val
                })
                : row
        })
        return {
            ...state,
            board: next,
        }
    })
)
