import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {StatisticsPage} from './pages/statistics/statistics.page';


@NgModule({
  declarations: [StatisticsPage],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule {
}
