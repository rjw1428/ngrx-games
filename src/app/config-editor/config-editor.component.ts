import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.scss']
})
export class ConfigEditorComponent implements OnInit {
  form1: FormGroup
  form2: FormGroup
  color1: string
  color2: string
  @Output() start = new EventEmitter()
  constructor(
    private service: ConfigService,
    private formBuilder: FormBuilder) { }

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

  onStart() {
    if (this.form1.valid && this.form2.valid)
      this.service.setConfig([
        { ...this.form1.value, color: this.color1 },
        { ...this.form2.value, color: this.color2 },
      ]).subscribe(
        noop,
        err => console.log(err),
        () => this.start.emit())
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
