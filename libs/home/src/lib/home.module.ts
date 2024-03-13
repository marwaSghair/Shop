import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromHome from '@osf-front/home/data-access';
import { HomeEffects } from '../../data-access/src/lib/+state/home.effects';
import * as fromCart from '@osf-front/cart/data-access';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromHome.HOME_FEATURE_KEY, fromHome.reducer),
    EffectsModule.forFeature([HomeEffects]),
    StoreModule.forFeature(fromCart.CART_FEATURE_KEY, fromCart.reducer),
    RouterModule.forChild([
      { path: '',
        component: HomeComponent
      }
    ]),
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule {}
