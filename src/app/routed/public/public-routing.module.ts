import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StatisticsPage} from './pages/statistics/statistics.page';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
