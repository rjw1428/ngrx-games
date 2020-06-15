import { MetaReducer, ActionReducerMap, ActionReducer } from '@ngrx/store'
import { environment } from 'src/environments/environment';
import { routerReducer } from "@ngrx/router-store";


export interface State {

}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer
};

// Custom metaReducer, runs before reducer is triggered
export function logger(reducer: ActionReducer<any>): ActionReducer<any>{
    return (state, action) => {
        console.log("PRE STATE", state)
        console.log("ACTION", action)
        return reducer(state, action)
    }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? []: [];