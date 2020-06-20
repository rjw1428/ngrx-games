import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { noop, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-model';
import { map, first, finalize } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player-model';

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
  submitAttempt: boolean = false
  // showSecondPlayer$: Observable<boolean>

  @Output() start = new EventEmitter<Player>()
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private service: PlayerService) {
    this.color1 = this.generateRandomColor()
    this.color2 = this.generateRandomColor()
  }

  ngOnInit(): void {
    // this.showSecondPlayer$ = this.store.pipe(map(state => state.game.playMode == "local2"))
    this.form1 = this.createPlayerForm(this.color1)
    this.form1.valueChanges.subscribe(vales => {
      this.submitAttempt = false
    })
  }

  onStart() {
    this.submitAttempt = true
    if (this.form1.valid) {
      const player = { ...this.form1.value, color: this.color1 }
      this.service.player = player
      this.start.emit(player)
    }
  }

  createPlayerForm(color: string) {
    return this.formBuilder.group({
      name: ["", Validators.required],
      symbol: ["", Validators.required],
      color: [color, Validators.required]
    })
  }

  generateRandomColor() {
    return "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
  }
}
