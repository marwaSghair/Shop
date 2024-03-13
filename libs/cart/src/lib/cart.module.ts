import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCart from '@osf-front/cart/data-access';
import { CartEffects } from '../../data-access/src/lib/+state/cart.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCart.CART_FEATURE_KEY, fromCart.reducer),
    EffectsModule.forFeature([CartEffects]),
    RouterModule.forChild([
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]),
    FormsModule
  ],
  declarations: [CartComponent, CheckoutComponent],
})
export class CartModule {}
