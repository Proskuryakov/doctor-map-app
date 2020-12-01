import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPage} from './pages/main/main.page';
import {MapPage} from './pages/map/map.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'map',
    component: MapPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule{

}
