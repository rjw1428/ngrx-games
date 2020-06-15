import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class SharedModule { }
