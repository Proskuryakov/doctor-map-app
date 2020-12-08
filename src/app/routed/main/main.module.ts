import {NgModule} from '@angular/core';
import {MainPage} from './pages/main/main.page';
import {MapPage} from './pages/map/map.page';
import {MainRoutingModule} from './main-routing.module';
import {IllnessPage} from './pages/illness/illness.page';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {SelectWithSearchComponent} from './components/select-with-search/select-with-search.component';
import {AddressAdditionInputComponent} from './components/address-addition-input/address-addition-input.component';
import {SickPage} from './pages/sick/sick.page';
import {NewSickDialog} from './dialogs/new-sick/new-sick.dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {SickModule} from '../../features/sick/sick.module';
import { UpdateSickDialog } from './dialogs/update-sick/update-sick.dialog';
import { ChangeIllnessDialog } from './dialogs/change-illlness/change-illness.dialog';

@NgModule({
  declarations: [
    MainPage,
    MapPage,
    IllnessPage,
    SelectWithSearchComponent,
    AddressAdditionInputComponent,
    SickPage,
    NewSickDialog,
    UpdateSickDialog,
    ChangeIllnessDialog
  ],
  imports: [
    MainRoutingModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ColorPickerModule,
    SickModule
  ]
})
export class MainModule {
}
