import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "game/:id",
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule),
  },
  {
    path: "**",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
