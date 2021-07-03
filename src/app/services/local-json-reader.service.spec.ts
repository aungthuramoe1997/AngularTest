import { TestBed } from '@angular/core/testing';

import { LocalJsonReaderService } from './local-json-reader.service';

describe('LocalJsonReaderService', () => {
  let service: LocalJsonReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalJsonReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
