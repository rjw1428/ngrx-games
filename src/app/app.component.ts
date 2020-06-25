import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NGRX Games';
  mode: string
  constructor() {
    const localBackground = localStorage.getItem('background')
    this.mode = localBackground?localBackground:'dark'
  }
  toggleDarkMode() {
    this.mode = (this.mode == 'dark') ? 'light' : "dark"
    localStorage.setItem("background", this.mode)
  }
}
