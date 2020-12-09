import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainGuard} from './core/guards/main.guard';
import {AuthGuard} from './core/guards/auth.guard';

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
  {
    path: 'public',
    loadChildren: () =>
      import('./routed/public/public.module').then(
        m => m.PublicModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
