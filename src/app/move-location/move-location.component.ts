import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '../models/app-model';
import { Store, select } from '@ngrx/store';
import { map, tap, filter, first, take, takeWhile, takeUntil, finalize, mergeMap } from 'rxjs/operators';
import { Observable, of, noop, iif } from 'rxjs';
import { Player } from '../models/player-model';
// import { currentTurnSelector } from '../shared/board.selectors';
import { GravityService } from '../services/gravity.service';
import { boardUpdated } from '../shared/board.actions';
import { Statement } from '@angular/compiler';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'move-location',
  templateUrl: './move-location.component.html',
  styleUrls: ['./move-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveLocationComponent implements OnInit {
  @Input() column: number
  @Input() row: number
  @Input() value: number
  @Output() moveSelected = new EventEmitter<{ row: number, col: number }>()
  onHover: boolean = false; // Used to highlight cell on mouse over
  currentTurn$: Observable<Player> // Used to determine cell highlight color
  gameType$: Observable<string> // Used to add shrinkable class on element size if game type == c4
  player: Player // cells value
  gameOver: boolean = false
  self$: Observable<Player>
  constructor(
    private store: Store<AppState>,
    private gravity: GravityService,
  ) { }

  ngOnInit(): void {
    this.currentTurn$ = this.store.pipe(map(state => state.game.players.find(player => player.id == state.game.turnId)))
    this.gameType$ = this.store.pipe(map(state => state.game.gameType))
    this.self$ = this.store.pipe(map(state => state.game.players.find(player => player.id == state.game.self)))
    this.store.pipe(
      map(state => state.game.players[this.value - 1]),
      takeWhile(player => !!player),
    ).subscribe(playerFromStore => {
      console.log(this.row,this.column,this.value)
      this.player = playerFromStore
    })

    // Subscribe to gameOver condition
    this.store.pipe(
      map(state => !!state.game.hasWon)
    ).subscribe(hasWon => this.gameOver = hasWon)
  }

  onClick() {
    // console.log(this.value)
    this.store.pipe(
      mergeMap(state =>
        iif(() => state.game.turnId == state.game.self && state.game.players.length > 1 && !this.value,
          this.store.pipe(
            map(state => {
              if (state.game.isGravity)
                return this.gravity.applyGravity(state.game.board, this.row, this.column)
              else return this.row
            })
          ),
          of(null)
        )
      ),
      first()
    ).subscribe((row: number | null) => {
      if (row!=null) {
        if (this.gameOver) return console.log("The game has been won, reset the board.")
        if (this.player) return console.log("Position already taken, try again.")
        this.moveSelected.emit({ row: row, col: this.column })
      }
    })

  }

  changeStyle(event) {
    this.onHover = event.type == 'mouseover'
  }
}
