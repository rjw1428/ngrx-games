import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Player } from '../models/player-model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  getConfig(): Observable<Player[]> {
    return this.http.get(`/api/config`).pipe(
      map((resp: any)=> resp.payload.map(player => {
        return new Player(player.id, player.name, player.symbol, player.color)
      }))
    )
  }

  setConfig(body) {
    this.http.post(`/api/config`, body)
  }
}
