import {
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CURRENT_USER_INITIALIZER } from './auth/current-user.service';
import { PermissionDirective } from './auth/permission.directive';
import { EmptyPage } from './empty/empty.page';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule, PermissionDirective],
  providers: [CURRENT_USER_INITIALIZER],
  declarations: [PermissionDirective, EmptyPage]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() coreModule?: CoreModule
  ) {
    if (coreModule != undefined) {
      throw Error('Core module must be defined only once');
    }
  }
}
