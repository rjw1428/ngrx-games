import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Observable, noop } from 'rxjs';
import { Player } from '../models/player-model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ok } from 'assert';

@Component({
  selector: 'app-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.scss']
})
export class ConfigEditorComponent implements OnInit {
  form1: FormGroup
  form2: FormGroup
  color1: string
  color2: string
  constructor(
    private service: ConfigService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form1 = this.createPlayerForm()
    this.form2 = this.createPlayerForm()

    this.service.getConfig().subscribe(config => {
      this.color1 = config[0].color
      this.color2 = config[1].color
      this.form1.setValue(config[0])
      this.form2.setValue(config[1])
    })
  }

  onSave() {
    if (this.form1.valid && this.form2.valid)
      this.service.setConfig([
        { ...this.form1.value, color: this.color1 },
        { ...this.form2.value, color: this.color2 },
      ]).subscribe(val => {
        noop
      }, 
      (err)=>this.snackBar.open("There was an error saving the new settings, Please try again!", "Ok"),
      ()=>this.snackBar.open("Player Settings Saved!", "Ok"))
  }

  onBack() {
    this.router.navigate(["/"])
  }

  createPlayerForm() {
    return this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      symbol: ["", Validators.required],
      color: ["", Validators.required]
    })
  }
}
