import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  styleUrls: ['./move-location.component.scss']
})
export class MoveLocationComponent implements OnInit {
  @Input() column: number
  @Input() row: number
  @Output() onMove = new EventEmitter<number>()
  player$: Observable<Player> // cells value
  onHover: boolean = false; // Used to highlight cell on mouse over
  currentTurn$: Observable<Player> // Used to determine cell highlight color
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.currentTurn$ = this.store.pipe(
      select(currentTurnSelector)
    )
    this.player$ = this.store.pipe(
      map(state=>{
        const value = state.game.board[this.row][this.column]
        return state.game.config.find(player=>player.id==value)
      }),
      takeWhile(player=>player!=null)
    )
  }

  onClick() {
    // if () return console.log("Position already taken, try again")
    this.store.dispatch(Actions.boardUpdated({ 
      row: this.row, 
      col: this.column
    }))
  }

  changeStyle(event) {
    this.onHover = event.type == 'mouseover'
  }
}
