import { TestBed } from '@angular/core/testing';

import { UserdetailsFetchService } from './userdetails-fetch.service';

describe('UserdetailsFetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserdetailsFetchService = TestBed.get(UserdetailsFetchService);
    expect(service).toBeTruthy();
  });
});
