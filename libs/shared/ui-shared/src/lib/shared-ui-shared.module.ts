import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePipe } from './pipes/name.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NamePipe
  ],
  exports: [
    NamePipe
  ]
})
export class SharedUiSharedModule {}
