import { TestBed } from '@angular/core/testing';

import { VotantesService } from './votantes.service';

describe('VotantesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VotantesService = TestBed.get(VotantesService);
    expect(service).toBeTruthy();
  });
});
