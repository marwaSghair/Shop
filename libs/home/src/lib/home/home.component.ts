import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import {  select, Store } from '@ngrx/store';
import * as HomeActions from '@osf-front/home/data-access';
import * as HomeSelectors from '@osf-front/home/data-access';
import { Subject, takeUntil} from 'rxjs';
import * as CartActions from '@osf-front/cart/data-access';

@Component({
  selector: 'osf-front-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  products$ = this.store.pipe(select(HomeSelectors.getProducts));
  constructor(private router: Router, private store: Store) {
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.store.dispatch(HomeActions.loadProducts());
    this.products$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data) {
            this.products = data;
        }
      },
    });  
  }
  addItemToCart(item: any): void {
    const quantity = 1
    const product = {...item, quantity}
    this.store.dispatch(CartActions.loadShopCartSuccess({cart: product}))
    this.router.navigate(['/shop/cart'])
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
