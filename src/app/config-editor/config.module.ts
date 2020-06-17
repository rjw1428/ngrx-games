import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigEditorComponent } from './config-editor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ConfigEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    ColorPickerModule,
  ],
  exports: [
    ConfigEditorComponent
  ]
})
export class ConfigModule { }
