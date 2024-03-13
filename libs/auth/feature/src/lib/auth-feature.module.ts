import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUiSharedModule } from '@osf-front/shared/ui-shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedUiSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ]),
  ],
  declarations: [LoginComponent],
})
export class AuthFeatureModule {}
