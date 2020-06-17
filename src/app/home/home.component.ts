import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-model';
import * as Actions from '../shared/board.actions'
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gameList = [
    { value: "ttt", label: "Tic Tac Toe" },
    { value: "c4", label: "Connect Four" },
  ]
  selectedGameId: string
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(
      map(state => state.game.gameType)
    ).subscribe(gameType => this.selectedGameId = gameType ? gameType : this.gameList[0].value)
  }

  onGameSelect(event: MatSelectChange) {
    this.selectedGameId = event.value
  }

  onConfigSet() {
    this.store.dispatch(Actions.gameSelected({
      gameTypeId: this.selectedGameId
    }))
    this.router.navigate(['/game'])

  }

}
