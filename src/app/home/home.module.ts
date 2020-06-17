import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { ConfigModule } from '../config-editor/config.module';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../shared/board.reducer';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ConfigModule,
    SharedModule,
    StoreModule.forFeature('game', boardReducer),
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
