import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneLineAddressPipe } from './pipes/one-line-address.pipe';



@NgModule({
  declarations: [OneLineAddressPipe],
  exports: [
    OneLineAddressPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SickModule { }
