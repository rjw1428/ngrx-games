import { GameState } from './game-model';

export interface AppState {
    router: any,
    game: GameState,
    colorMode: string
}
