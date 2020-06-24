import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class ApiService {
  socket: SocketIOClient.Socket;
  values = new BehaviorSubject<any>(null)
  constructor() {
    this.socket = io(environment.apiUrl)
    this.socket.on('onConnect', (resp) => {
      if (resp.message) alert(resp.message)
    })
    this.socket.on('apiData', (resp) => {
      this.values.next(resp)
    })
  }
}
