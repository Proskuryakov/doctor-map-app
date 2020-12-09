import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {StatisticsPage} from './pages/statistics/statistics.page';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [StatisticsPage],
    imports: [
        CommonModule,
        PublicRoutingModule,
        FormsModule
    ]
})
export class PublicModule {
}
