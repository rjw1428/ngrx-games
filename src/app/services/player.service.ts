import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Player } from '../models/player-model';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-model';
import { Router } from '@angular/router';
import { setPlayers, turnChanged, setSelfId, updateBoard, initializeBoard, setRoomInfo, playmodeSelected, gameTypeSelected } from '../shared/board.actions';
import { map, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  socket: SocketIOClient.Socket
  player: Player
  roomData = {
    name: "",
    gameType: "",
    creator: ""
  }
  constructor(
    private store: Store<AppState>,
    private router: Router) {
    this.socket = io(environment.apiUrl)
    
    this.socket.on('roomData', ({ room, users }) => {
      this.store.dispatch(setPlayers({ players: users, room }))
      if (room != this.roomData.name) {
        this.roomData.name = room
        this.router.navigate(['/game', room])
      }
    })

    this.socket.on('onConnect', (resp) => {
      if (resp.message) alert(resp.message)
      if (resp.action == 'reset') {
        this.store.pipe(
          first(),
          map(state => state.game.boardSize),
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

    this.socket.on('recieveRoomInfo', (roomData: Room) => {
      this.store.dispatch(setRoomInfo({ roomData }))
      this.store.dispatch(gameTypeSelected({ gameType: roomData.type }))
    })
  }

  joinGame(player: Player, gameType: string) {
    player.id = this.socket.id
    this.store.dispatch(setSelfId({ self: player.id }))
    this.socket.emit('join', { ...player, type: gameType }, (error) => {
      if (error) return alert(error)
    })
  }

  broadcastMove(move: { row: number, col: number, value: number }) {
    this.socket.emit('moveMade', { ...move }, (error) => {
      if (error) return alert(error)
    })
  }

  onDisconnect() {
    this.roomData = {
      name: "",
      gameType: "",
      creator: ""
    }
    this.socket.emit('leaveGame', (error) => {
      if (error) return alert(error)
    })
  }

  initializeBoard(width, height): number[][] {
    return Array(height).fill(
      Array(width).fill(0)
    )
  }

  requestRoomInfo(room: string) {
    this.socket.emit("whatRoom", { room }, ({ error }) => {
      if (error) alert(error)
      this.router.navigate(['/'])
    })
  }

  setResetState() {
    this.socket.emit('reset', (error) => {
      if (error) return alert(error)
    })
  }
}
