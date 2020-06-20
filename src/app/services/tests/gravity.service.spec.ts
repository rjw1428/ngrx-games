import { TestBed } from '@angular/core/testing';
import { GravityService } from '../gravity.service';
import * as test from '../../test/boards'

describe('GravityService', () => {
  let service: GravityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GravityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should let selection fall to bottom', () => {
    expect(service.applyGravity(test.board1, 0, 1)).toBe(2)
    expect(service.applyGravity(test.board2, 0, 0)).toBe(0)
    expect(service.applyGravity(test.board4, 1, 3)).toBe(2)
    expect(service.applyGravity(test.board4, 0, 3)).toBe(2)
  })

  it('shoult move selection to top and let it fall', () => {
    expect(service.applyGravity(test.board4, 3, 3)).toBe(2)
  })

  it('should not let selection onto board', () => {
    expect(service.applyGravity(test.board1, 0, 0)).toBe(-1)
  })

});
