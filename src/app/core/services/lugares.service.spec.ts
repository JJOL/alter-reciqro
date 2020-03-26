import { TestBed } from '@angular/core/testing';

import { LugaresService } from './lugares.service';

describe('LugaresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LugaresService = TestBed.get(LugaresService);
    expect(service).toBeTruthy();
  });
});
