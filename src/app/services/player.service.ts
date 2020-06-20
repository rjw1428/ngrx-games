import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Player } from '../models/player-model';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-model';
import { Router } from '@angular/router';
import { setPlayers, turnChanged, setSelfId, updateBoard, initializeBoard } from '../shared/board.actions';
import { map, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  socket: SocketIOClient.Socket
  player: Player
  defaultRoom = "xyz123"
  constructor(
    private store: Store<AppState>,
    private router: Router) {
    this.socket = io(environment.apiUrl)
    this.socket.on('roomData', ({ room, users }) => {
      this.store.dispatch(setPlayers({ players: users }))
    })

    this.socket.on('onConnect', (resp) => {
      console.log(resp.message)
      alert(resp.message)
      if (resp.action == 'reset') {
        this.store.pipe(
          map(state => state.game.boardSize),
          first()
        ).subscribe(boardSize => {
          this.store.dispatch(initializeBoard({
            board: this.initializeBoard(boardSize[0], boardSize[1])
          }))
        })
      }
    })

    this.socket.on('setTurn', ({ turn }) => {
      this.store.dispatch(turnChanged(turn))
    })

    this.socket.on('recieveMove', (move) => {
      this.store.dispatch(updateBoard(move))
    })
  }

  joinGame(player: Player, gameType: string) {
    player.id = this.socket.id
    this.store.dispatch(setSelfId({ self: player.id }))
    this.socket.emit('join', { ...player, room: this.defaultRoom + gameType }, (error) => {
      if (error) {
        return alert(error)
      }
      this.router.navigate(['/game', this.defaultRoom])
    })
  }

  broadcastMove(move: { row: number, col: number, value: number }) {
    this.socket.emit('moveMade', { ...move }, (error) => {
      if (error) {
        return alert(error)
      }
    })
  }

  onDisconnect() {
    this.socket.emit('leaveGame', (error) => {
      if (error) {
        return alert(error)
      }
    })
  }

  initializeBoard(width, height): number[][] {
    return Array(height).fill(
      Array(width).fill(0)
    )
  }

  // makeRoomId(length) {
  //   let result = '';
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   const charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }
}
