import { Injectable } from '@angular/core'
import { ofType, createEffect, Actions } from "@ngrx/effects";
import { ConfigService } from '../services/config.service';
import * as GameActions from './board.actions'
import { setPlayerConfig } from './board.actions'

@Injectable()
export class BoardEffects {
    // loadCourses$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(GameActions.getPlayerConfig),
    //         concatMap(action => this.configService.getConfig()),
    //         map(config => setPlayerConfig({ config }))
    //     )
    // )

    // saveCourse$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(CourseActions.courseUpdated),
    //         concatMap(action => this.coursesHttpService.saveCourse(
    //             action.update.id,
    //             action.update.changes
    //         ))
    //     ), {dispatch: false}
    // )
    constructor(
        private actions$: Actions,
        private configService: ConfigService
    ) {

    }
}