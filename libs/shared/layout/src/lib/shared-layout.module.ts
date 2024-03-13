import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SharedUiSharedModule } from '@osf-front/shared/ui-shared';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    SharedUiSharedModule,
    RouterModule.forChild([
      {
        path:'', component: ContainerComponent,
        children:[
          {
            path:'home',
            loadChildren: ()=> import(`libs/home/src/lib/home.module`).then((m)=>m.HomeModule)
          },
          {
            path:'product/:id',
            loadChildren: ()=> import(`libs/product/src/lib/product.module`).then((m)=>m.ProductModule)
          },
          {
            path:'shop',
            loadChildren: ()=> import(`libs/cart/src/lib/cart.module`).then((m)=>m.CartModule)
          }
        ],

}],),
  ],
  declarations: [
    ContainerComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedLayoutModule {}
