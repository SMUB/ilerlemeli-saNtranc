import { TestBed } from '@angular/core/testing';

import { PiecesService } from './pieces.service';

describe('PiecesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PiecesService = TestBed.get(PiecesService);
    expect(service).toBeTruthy();
  });

  it('should return a 2D array', () => {
    const service: PiecesService = TestBed.get(PiecesService);
    expect(service.firstDeployment()[0][0]).toBeDefined();
  });


  it('should return a 1D array', () => {
    const service: PiecesService = TestBed.get(PiecesService);
    expect(service.getNextLine()[0]).toBeDefined();
    expect(service.getNextLine()[0][0]).toBeUndefined();
  });
});
