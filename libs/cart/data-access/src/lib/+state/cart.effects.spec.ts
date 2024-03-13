import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CartActions from './cart.actions';
import { CartEffects } from './cart.effects';

describe('CartEffects', () => {
  let actions: Observable<Action>;
  let effects: CartEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CartEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CartEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CartActions.init() });

      const expected = hot('-a-|', {
        a: CartActions.loadCartSuccess({ cart: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
