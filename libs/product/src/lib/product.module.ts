import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import * as fromProduct from '@osf-front/product/data-access';
import { ProductEffects } from '../../data-access/src/lib/+state/product.effects';
import * as fromCart from '@osf-front/cart/data-access';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProduct.PRODUCT_FEATURE_KEY,
      fromProduct.reducer
    ),
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature(fromCart.CART_FEATURE_KEY, fromCart.reducer),
    RouterModule.forChild([
      { path: '',
        component: ProductComponent
      }
    ]),
    FormsModule
  ],
  declarations: [
    ProductComponent
  ],
})
export class ProductModule {}
