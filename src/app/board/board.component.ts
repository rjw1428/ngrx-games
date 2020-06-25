import { Component, OnInit, ChangeDetectionStrategy, HostListener, Input } from '@angular/core';
import { Observable, noop } from 'rxjs';
import { Player } from '../models/player-model';;
import { Store, select } from '@ngrx/store';
import { boardSelector, hasWonSelector } from '../shared/board.selectors';
import { AppState } from '../models/app-model';
import { WinService } from '../services/win.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map, first, tap, filter } from 'rxjs/operators';
import { initializeBoard, boardUpdated } from '../shared/board.actions';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  roomName$: Observable<string>
  board$: Observable<any>
  turn$: Observable<Player>
  config$: Observable<Player[]>
  hasWon$: Observable<Player> | null
  isTie$: Observable<boolean>
  opponent$: Observable<Player>
  self$: Observable<Player>
  host: string
  constructor(
    private store: Store<AppState>,
    private winService: WinService,
    private router: Router,
    private playerService: PlayerService
  ) {
  }

  //Disconnect player on 'Back' navigation
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.playerService.onDisconnect()
  }

  ngOnInit(): void {
    this.host = window.location.origin
    // Initialize Board
    this.onReset()
    // this.route.paramMap.subscribe(console.log)

    // Monitor Game conditions
    this.isTie$ = this.store.pipe(
      switchMap(state => this.winService.checkWinConitions(state.game.winChain)),
      map(state => !this.winService.checkNoMovesCondition(state.board, !!state.hasWon)),
    )

    this.roomName$ = this.store.pipe(map(state => state.game.room))
    this.board$ = this.store.pipe(select(boardSelector))
    this.turn$ = this.store.pipe(map(state => state.game.players.find(player => player.id == state.game.turnId)))
    this.opponent$ = this.store.pipe(map(state => state.game.players.find(player => player.id != state.game.self)))
    this.self$ = this.store.pipe(map(state => state.game.players.find(player => player.id == state.game.self)))
    this.hasWon$ = this.store.pipe(select(hasWonSelector))
  }

  onMoveSelected(position: { row: number, col: number }) {
    this.store.pipe(
      map(state => state.game.players.findIndex(player => player.id == state.game.self) + 1),
      first()
    ).subscribe(value => {
      this.playerService.broadcastMove({ ...position, value })
    })
  }

  onReset() {
    this.store.pipe(
      map(state => {
        return {
          width: state.game.boardSize[0],
          height: state.game.boardSize[1]
        }
      }),
      first()
    ).subscribe(board => {
      if (!board.height || !board.width)
        this.onHome()
      else {
        this.playerService.setResetState()
        this.store.dispatch(initializeBoard({
          board: this.playerService.initializeBoard(board.width, board.height)
        }))
      }
    })
  }

  onHome() {
    this.router.navigate(['/'])
    this.playerService.onDisconnect()
  }
}
