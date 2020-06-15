import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfigEditorComponent } from './config-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ConfigService } from '../services/config.service';
export const routes: Routes = [
  {
    path: '',
    component: ConfigEditorComponent
  }
]

@NgModule({
  declarations: [
    ConfigEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ConfigEditorComponent
  ]
})
export class ConfigModule { }
