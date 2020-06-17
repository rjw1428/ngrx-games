import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { MoveLocationComponent } from '../move-location/move-location.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../shared/board.reducer';
import { BoardEffects } from '../shared/board.effects';
import { EffectsModule } from '@ngrx/effects';
import { WinService } from '../services/win.service';
import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    component: BoardComponent
  }
]

@NgModule({
  declarations: [
    BoardComponent,
    MoveLocationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('game', boardReducer),
    EffectsModule.forFeature([BoardEffects])
  ],
  providers: [
    WinService
  ]
})
export class BoardModule { }
