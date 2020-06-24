import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
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
  }

  getBackendData(property) {
    this.socket.emit('requestData', { property }, (resp) => {
      if (resp.error) return alert(resp.error)
      this.values.next(resp)
    })
  }
}
