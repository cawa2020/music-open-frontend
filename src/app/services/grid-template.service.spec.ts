import { TestBed } from '@angular/core/testing';

import { GridTemplateService } from './grid-template.service';

describe('GridTemplateService', () => {
  let service: GridTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
