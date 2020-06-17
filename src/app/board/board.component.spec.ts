import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { BoardModule } from './board.module';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialGameState } from '../shared/board.reducer';
import { AppModule } from '../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let store: MockStore;
  let initialState = {
    ...initialGameState,
    board: [[1,0,0],[1,0,0],[1,0,0]]
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        AppModule,
        BoardModule,
        HttpClientTestingModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(()=>{
    fixture.destroy();
  })
});
