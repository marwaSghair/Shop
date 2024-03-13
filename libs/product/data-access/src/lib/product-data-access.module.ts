import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProduct from './+state/product.reducer';
import { ProductEffects } from './+state/product.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProduct.PRODUCT_FEATURE_KEY,
      fromProduct.reducer
    ),
    EffectsModule.forFeature([ProductEffects]),
  ],
})
export class ProductDataAccessModule {}
