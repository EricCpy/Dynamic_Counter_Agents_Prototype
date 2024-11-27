import {TestBed} from '@angular/core/testing';

import {ShoppingCartService} from './shoppingcart.service';

describe('ShoppingcartService', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
