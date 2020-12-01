import {NgModule} from '@angular/core';
import {MainPage} from './pages/main/main.page';
import {MapComponent} from './components/map/map.component';
import {MapPage} from './pages/map/map.page';
import {MainRoutingModule} from './main-routing.module';
import {IllnessPage} from './pages/illness/illness.page';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  declarations: [
    MainPage,
    MapComponent,
    MapPage,
    IllnessPage,
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
