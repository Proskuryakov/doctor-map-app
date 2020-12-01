import {NgModule} from '@angular/core';
import {MainPage} from './pages/main/main.page';
import {MainComponent} from './components/main/main.component';
import {MapComponent} from './components/map/map.component';
import {MapPage} from './pages/map/map.page';
import {MainRoutingModule} from './main-routing.module';

@NgModule({
  declarations: [
    MainPage,
    MainComponent,
    MapComponent,
    MapPage,
  ],
  imports: [
    MainRoutingModule
  ]
})
export class MainModule{

}
