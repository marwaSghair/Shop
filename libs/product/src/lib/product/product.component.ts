import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import {  select, Store } from '@ngrx/store';
import { Subject, takeUntil} from 'rxjs';
import * as ProductActions from '@osf-front/product/data-access';
import * as ProductSelectors from '@osf-front/product/data-access';
import { ActivatedRoute, Router } from '@angular/router';
import * as CartActions from '@osf-front/cart/data-access';
@Component({
  selector: 'osf-front-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductComponent implements OnInit, OnDestroy {
  inputnumber = 1;
  productDetails: any;
  id: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  productDetails$ = this.store.pipe(select(ProductSelectors.getProductDetails));
  constructor( private router: Router,
    private route: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.id = this.route?.snapshot?.paramMap?.get('id');
      this.getProductDetails(this.id);
    }); 
  }
  getProductDetails(id: string){
    this.store.dispatch(ProductActions.loadProductDetails({productId:id}))
    this.productDetails$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: any) => {
        if (data) {
            this.productDetails = data;
        }
      },
    });  
  }
  addItemToCart(item: any): void {
    const quantity = this.inputnumber
    const product = {...item, quantity}
    this.store.dispatch(CartActions.loadShopCartSuccess({cart: product}))
    this.router.navigate(['/shop/cart'])
  }
  plus(){
   this.inputnumber = this.inputnumber+1;
   this.store.dispatch(CartActions.incrementCount())
  }
  minus(){
    if(this.inputnumber != 0)
    {
    this.store.dispatch(CartActions.decrementCount())
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
