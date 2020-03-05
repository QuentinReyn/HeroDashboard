import { TestBed } from '@angular/core/testing';

import { WeaponsService } from './weapons.service';

describe('WeaponsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeaponsService = TestBed.get(WeaponsService);
    expect(service).toBeTruthy();
  });
});
