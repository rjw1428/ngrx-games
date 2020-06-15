import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfigEditorComponent } from './config-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '../models/shared.module';


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
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ColorPickerModule,
    RouterModule.forChild(routes),
  ],

})
export class ConfigModule { }
