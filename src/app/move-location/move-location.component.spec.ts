import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveLocationComponent } from './move-location.component';
import { AppModule } from '../app.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialGameState } from '../shared/board.reducer';

describe('MoveLocationComponent', () => {
  let component: MoveLocationComponent;
  let fixture: ComponentFixture<MoveLocationComponent>;
  let store: MockStore;
  const initialState = {
    ...initialGameState,
    board: [[1,0,0],[1,0,0],[1,0,0]]
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveLocationComponent ],
      imports: [
        AppModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy()
  })
});
