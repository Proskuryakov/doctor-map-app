import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPage} from './routed/main/pages/main/main.page';
import {MapPage} from './routed/main/pages/map/map.page';
import {MainGuard} from './core/guards/main.guard';
import {AuthGuard} from './core/guards/auth.guard';
import {EmptyPage} from './core/empty/empty.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [MainGuard],
    loadChildren: () =>
      import('./routed/main/main.module').then(
        (m) => m.MainModule
      )
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./routed/auth/auth.module').then(
        m => m.AuthModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
