import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigEditorComponent } from './config-editor/config-editor.component';


const routes: Routes = [{
  path: "config",
  loadChildren: () => import('./config-editor/config.module').then(m => m.ConfigModule),
},
{
  path: "",
  loadChildren: () => import('./board/board.module').then(m => m.BoardModule),
},
{
  path: "**",
  redirectTo: ""
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
