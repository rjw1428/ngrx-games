import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '../models/app-model';
import { Store, select } from '@ngrx/store';
import * as Actions from '../shared/board.actions'
import { map, tap, filter, first, take, takeWhile } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Player } from '../models/player-model';
import { currentTurnSelector } from '../shared/board.selectors';

@Component({
  selector: 'move-location',
  templateUrl: './move-location.component.html',
  styleUrls: ['./move-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveLocationComponent implements OnInit {
  @Input() column: number
  @Input() row: number
  onHover: boolean = false; // Used to highlight cell on mouse over
  currentTurn$: Observable<Player> // Used to determine cell highlight color
  player: Player // cells value
  gameOver: boolean = false
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    // Subscribe to current turn
    this.currentTurn$ = this.store.pipe(
      select(currentTurnSelector)
    )
    // Subscribe to which player to display
    this.store.pipe(
      map(state => {
        const value = state.game.board[this.row][this.column]
        return state.game.config.find(player => player.id == value)
      }),
      takeWhile(player => player != null)
    ).subscribe(playerFromStore => {
      this.player = playerFromStore
    })

    // Subscribe to gameOver condition
    this.store.pipe(
      map(state => !!state.game.hasWon)
    ).subscribe(hasWon => this.gameOver = hasWon)
  }

  onClick() {
    if (this.gameOver) return console.log("The game has been won, reset the board.")
    if (this.player) return console.log("Position already taken, try again.")
    this.store.dispatch(Actions.boardUpdated({
      row: this.row,
      col: this.column
    }))
  }

  changeStyle(event) {
    this.onHover = event.type == 'mouseover'
  }
}
