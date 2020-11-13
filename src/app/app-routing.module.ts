import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPage} from './routed/pages/main/main.page';
import {MapPage} from './routed/pages/map/map.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'map',
    component: MapPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
