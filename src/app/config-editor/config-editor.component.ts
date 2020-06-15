import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Observable } from 'rxjs';
import { Player } from '../models/player-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-editor',
  templateUrl: './config-editor.component.html',
  styleUrls: ['./config-editor.component.scss']
})
export class ConfigEditorComponent implements OnInit {
  config$: Observable<Player[]>
  constructor(
    private service: ConfigService,
    private router: Router) { }

  ngOnInit(): void {
    this.config$ = this.service.getConfig()
  }

  onBack() {
    this.router.navigate(["/"])
  }
}
