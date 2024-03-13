import { Component, OnInit, OnDestroy } from '@angular/core';
import * as CartSelectors from '@osf-front/cart/data-access';
import {  select, Store } from '@ngrx/store';
import * as CartActions from '@osf-front/cart/data-access';
import { Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'osf-front-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartProducts: any;
  totalPrice: any;
  subTotalPrice: any;
  count: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  cart$ = this.store.pipe(select(CartSelectors.getCart));
  count$ = this.store.pipe(select(CartSelectors.getCount));
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(){
    this.store.dispatch(CartActions.loadShopCart());
    this.cart$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data) {
          this.cartProducts = data;
          this.subTotalPrice = this.getTotalPrice();
          this.totalPrice = ((this.getTotalPrice()/100) * 10) + this.getTotalPrice();
        }
      },
    });  
    this.count$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data) {
          this.count = data;
        }
      },
    });  
  }
  removeFromCart(item: any) {
    this.store.dispatch(CartActions.removeItemFromCart({cart: item}))
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartProducts.map((a:any)=>{
      grandTotal += a.price;
    })
    return grandTotal;
  }
  getItemPrice(price: any) : number{
    return price * this.count;
  }
  plus(item: any){
    // const index = this.cartProducts.findIndex((x: any) => x.id === item.id);
    // const quantity = this.cartProducts[index].quantity+1;
    this.store.dispatch(CartActions.incrementCount())
   }
   minus(item: any){
     if(this.count != 0)
     {
      this.store.dispatch(CartActions.decrementCount())
     }
   }
   ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
