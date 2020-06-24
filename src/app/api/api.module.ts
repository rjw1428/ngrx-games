import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ApiComponent } from './api.component';
import { ApiService } from '../services/api.service';

export const routes: Routes = [
  {
    path: '',
    component: ApiComponent
  }
]

@NgModule({
  declarations: [
    ApiComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ApiService
  ]
})
export class ApiModule { }
