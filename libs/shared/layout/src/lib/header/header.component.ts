import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subject, takeUntil} from 'rxjs';
import * as CartSelectors from '@osf-front/cart/data-access';
import {  select, Store } from '@ngrx/store';

@Component({
  selector: 'osf-front-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  cart$ = this.store.pipe(select(CartSelectors.getCart));
  cartProducts: any;
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(){
    this.cart$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data) {
          this.cartProducts = data;
        }
      },
    });  
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
