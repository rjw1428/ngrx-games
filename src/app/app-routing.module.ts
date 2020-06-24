import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "game/:id",
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule),
  },
  {
    path: "api/:endpoint",
    loadChildren: () => import('./api/api.module').then(m => m.ApiModule),
  },
  {
    path: ":id",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
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
