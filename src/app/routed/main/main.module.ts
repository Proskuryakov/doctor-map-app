import {NgModule} from '@angular/core';
import {MainPage} from './pages/main/main.page';
import {MapPage} from './pages/map/map.page';
import {MainRoutingModule} from './main-routing.module';
import {IllnessPage} from './pages/illness/illness.page';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {SelectWithSearchComponent} from './components/select-with-search/select-with-search.component';
import {AddressAdditionInputComponent} from './components/address-addition-input/address-addition-input.component';

@NgModule({
  declarations: [
    MainPage,
    MapPage,
    IllnessPage,
    SelectWithSearchComponent,
    AddressAdditionInputComponent,
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ColorPickerModule
  ]
})
export class MainModule {
}
