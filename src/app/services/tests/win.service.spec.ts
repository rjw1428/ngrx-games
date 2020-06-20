import { TestBed } from '@angular/core/testing';

import { WinService } from '../win.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialGameState } from '../../shared/board.reducer';
import { addMatchers, initTestScheduler } from 'jasmine-marbles';
import { AppModule } from '../../app.module';
import { GameState } from '../../models/game-model';
import * as test from '../../test/boards'

describe('WinService', () => {
  let service: WinService;
  let store$: MockStore<GameState>;

  const initialState = {
    ...initialGameState,
    board: test.board5,
    hasWon: null
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        WinService,
        provideMockStore({ initialState }),
      ]
    });
    initTestScheduler();
    addMatchers();
    service = TestBed.inject(WinService);
    store$ = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should produce a column win', () => {
    expect(service.checkAllCols(test.board1, 3)).toBeTruthy()
  })

  it('should not produce a column win', () => {
    expect(service.checkAllCols(test.board2, 3)).toBeFalsy()
  })

  it('should produce a row win', () => {
    expect(service.checkAllRows(test.board2, 3)).toBeTruthy()
  })

  it('should not produce a row win', () => {
    expect(service.checkAllRows(test.board1, 3)).toBeFalsy()
  })

  it('should produce a diagnal win', () => {
    expect(service.checkDiagnalWin(test.board2, 3)).toBeTruthy()
    expect(service.checkDiagnalWin(test.board3, 3)).toBeTruthy()
  })

  it('should not produce a diagnal win', () => {
    expect(service.checkDiagnalWin(test.board2, 4)).toBeFalsy()
    expect(service.checkDiagnalWin(test.board3, 4)).toBeFalsy()
  })

  // it('should produce a tie', () => {
  //   expect(service.checkNoMovesCondition(test.board5, false)).toBeFalsy()
  // })

  // it('should not produce a tie', () => {
  //   expect(service.checkNoMovesCondition(test.board3, false)).toBeFalsy()
  // })
});
