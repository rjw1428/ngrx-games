import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-model';
import { Router, ActivatedRoute } from '@angular/router';
import { map, first, switchMap, tap, takeUntil } from 'rxjs/operators';
import { PlayerService } from '../services/player.service';
import { playmodeSelected, gameSelected, gameTypeSelected } from '../shared/board.actions';
import { Player } from '../models/player-model';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

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
  roomId$: Observable<string>
  inviteGame$: Observable<boolean>
  roomData$: Observable<Room>
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.roomId$ = this.route.paramMap.pipe(
      first(),
      map(params => params['params'].id),
      tap(roomId => {
        if (roomId) this.playerService.requestRoomInfo(roomId)
      })
    )
    this.inviteGame$ = this.roomId$.pipe(map(id => !!id))
    this.onGameSelect(this.gameList[0] as any)
    this.selectedPlayMode = this.modeList[0].value
    this.roomData$ = this.store.pipe(
      map(state => {
        const typeOption = this.gameList.find(listOption => listOption.value == state.game.gameType)
        return {
          name: state.game.room,
          type: typeOption ? typeOption.label : "",
          creator: state.game.creator
        }
      })
    )
  }

  onGameSelect(event: MatSelectChange | any) {
    this.selectedGameId = event.value
    this.store.dispatch(gameTypeSelected({
      gameType: this.selectedGameId
    }))
  }

  onModeSelect(event: MatSelectChange) {
    this.selectedPlayMode = event.value
    this.store.dispatch(playmodeSelected({
      mode: this.selectedPlayMode
    }))
  }

  onConfigSet(player: Player) {
    this.store.pipe(
      first(),
      map(state => ({ room: state.game.room, gameType: state.game.gameType }))
    ).subscribe(({ room, gameType }) => {
      if (room) player.room = room
      if (!gameType) gameType = this.selectedGameId
      this.playerService.joinGame(player, gameType)
      this.store.dispatch(gameSelected({
        gameTypeId: gameType,
        player
      }))
    })
  }
}
