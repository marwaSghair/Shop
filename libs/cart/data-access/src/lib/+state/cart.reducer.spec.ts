import { Action } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { CartEntity } from './cart.models';
import { State, initialState, reducer } from './cart.reducer';

describe('Cart Reducer', () => {
  const createCartEntity = (id: string, name = ''): CartEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Cart actions', () => {
    it('loadCartSuccess should return the list of known Cart', () => {
      const cart = [
        createCartEntity('PRODUCT-AAA'),
        createCartEntity('PRODUCT-zzz'),
      ];
      const action = CartActions.loadCartSuccess({ cart });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
