import { TestBed } from '@angular/core/testing';

import { Pasatela } from './pasatela';

describe('Pasatela', () => {
  let service: Pasatela;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pasatela);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
