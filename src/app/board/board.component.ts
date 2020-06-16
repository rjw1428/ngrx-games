import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Observable, noop } from 'rxjs';
import { Player } from '../models/player-model';;
import { Store, select } from '@ngrx/store';
import * as Actions from '../shared/board.actions'
import { map, tap } from 'rxjs/operators';
import { boardSelector, turnSelector, configSelector, hasWonSelector } from '../shared/board.selectors';
import { GameState } from '../models/game-model';
import { AppState } from '../models/app-model';
import { WinService } from '../services/win.service';
import { Router } from '@angular/router';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  player1: Player
  player2: Player
  boardWidth = 6
  boardHeight = 4
  winChain = 4
  board$: Observable<any>
  turn$: Observable<Player>
  config$: Observable<Player[]>
  hasWon$: Observable<Player>
  isTie: boolean = false

  constructor(
    private store: Store<AppState>,
    private winService: WinService,
    private router: Router,
    private configService: ConfigService
  ) {
  }

  ngOnInit(): void {
    // Initialize Board
    this.onReset()

    // Monitor Game conditions
    this.winService.checkWinConitions(this.winChain).subscribe(noop)
    this.winService.checkNoMovesCondition().subscribe(freeMoves => this.isTie = !freeMoves)

    // Get Player config
    this.configService.getConfig().subscribe(players => {
      this.store.dispatch(Actions.setPlayerConfig({
        config: players
      }))
    })

    this.board$ = this.store.pipe(
      select(boardSelector)
    )

    this.turn$ = this.store.pipe(
      select(turnSelector)
    )

    this.config$ = this.store.pipe(
      select(configSelector)
    )

    this.hasWon$ = this.store.pipe(
      select(hasWonSelector)
    )
  }

  initializeBoard(width, height): number[][] {
    return Array(height).fill(
      Array(width).fill(0)
    )
  }

  onReset() {
    this.store.dispatch(Actions.initializeBoard({
      board: this.initializeBoard(this.boardWidth, this.boardHeight)
    }))
  }

  onSettings() {
    this.router.navigate(['/config'])
  }
}
