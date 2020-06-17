import { TestBed, inject } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { addMatchers, initTestScheduler } from 'jasmine-marbles';
import { AppModule } from '../app.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { response } from 'express';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule
      ],
    });
    initTestScheduler();
    addMatchers();
    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of 2 players', () => {
    service.getConfig().subscribe(resp => {
      expect(resp.length).toBe(2)
      expect(resp[0].id).toBe(1)
      expect(resp[1].name).toBe("TEST 0")
      expect(resp.map(player => player.color)).toEqual(["red", "blue"])
    })

    const req = httpMock.expectOne(service.ENDPOINT);
    req.flush({
      payload: [{
        id: 1,
        name: "TEST 1",
        symbol: "A",
        color: "red"
      },
      {
        id: 0,
        name: "TEST 0",
        symbol: "B",
        color: "blue"
      }]
    });
    httpMock.verify();
  });

});
