import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  title$: Observable<string>
  valueList$: Observable<string[]>
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.title$ = this.route.paramMap.pipe(map(params => params["params"]['endpoint']))
    this.apiService.getBackendData('users')
    this.valueList$ = this.apiService.values.asObservable()
  }

}
