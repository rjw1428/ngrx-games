import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../models/player-model';

@Pipe({
  name: 'playerString'
})
export class PlayerStringPipe implements PipeTransform {

  transform(player: Player): string {
    return player ?`${player.name} (${player.symbol})` : ""
  }

}
