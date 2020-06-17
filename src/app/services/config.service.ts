import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Player } from '../models/player-model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  ENDPOINT = "/api/config"
  constructor(private http: HttpClient) { }

  getConfig(): Observable<Player[]> {
    return this.http.get(this.ENDPOINT).pipe(
      map(resp => this.createPlayers(resp))
    )
  }

  setConfig(body): Observable<Player[]> {
    return this.http.post(this.ENDPOINT, body).pipe(
      map(resp => this.createPlayers(resp))
    )
  }

  createPlayers(resp: any): Player[] {
    return resp.payload.map(player => {
      return new Player(player.id, player.name, player.symbol, player.color)
    })
  }
}
