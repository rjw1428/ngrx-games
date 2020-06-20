import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';
import { playmodeSelected, gameSelected } from '../shared/board.actions';
import { Player } from '../models/player-model';

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
  modeList = [
    // { value: "local1", label: "Vs Computer" },
    { value: "web", label: "Two Player (Online)" },
    // { value: "local2", label: "Two Player (Local)" },
  ]
  selectedGameId: string
  selectedPlayMode: string
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.selectedGameId = this.gameList[0].value
    this.selectedPlayMode = this.modeList[0].value
  }

  onGameSelect(event: MatSelectChange) {
    this.selectedGameId = event.value
  }

  onModeSelect(event: MatSelectChange) {
    this.selectedPlayMode = event.value
    this.store.dispatch(playmodeSelected({
      mode: this.selectedPlayMode
    }))
  }

  onConfigSet(player: Player) {
    this.playerService.joinGame(player, this.selectedGameId)
    this.store.dispatch(gameSelected({
      gameTypeId: this.selectedGameId,
      player
    }))
  }
}
