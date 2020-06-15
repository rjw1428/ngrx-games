import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveLocationComponent } from './move-location.component';

describe('MoveLocationComponent', () => {
  let component: MoveLocationComponent;
  let fixture: ComponentFixture<MoveLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
