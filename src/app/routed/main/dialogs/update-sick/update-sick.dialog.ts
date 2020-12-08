import {Component, Inject, OnInit} from '@angular/core';
import {FiasAddressModel} from '../../../../features/address/models/fias-address.model';
import {SickModel} from '../../../../features/sick/models/sick.model';
import {SickApiService} from '../../../../features/sick/services/sick-api.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  templateUrl: './update-sick.dialog.html',
  styleUrls: ['./update-sick.dialog.sass']
})
export class UpdateSickDialog implements OnInit {
  region: FiasAddressModel | undefined = undefined;
  city: FiasAddressModel | undefined = undefined;
  street: FiasAddressModel | undefined = undefined;
  house: FiasAddressModel | undefined = undefined;

  loading: boolean = false;
  error: boolean = false;
  message: boolean = false;
  messageText: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: SickModel,
    private readonly sickApiService: SickApiService
  ) {
  }

  ngOnInit(): void {
  }

  updateSick(): void {

    this.loading = true;
    this.checkAddress();

    this.sickApiService.updateSick(this.data).subscribe(() => {
      this.loading = false;
      this.message = true;
      this.messageText = 'Данные успешно обновлены';
    }, () => {
      this.loading = false;
      this.error = true;
      this.messageText = 'Произошла ошибка при обновлении';
    });
  }

  private checkAddress(): void {
    if (this.region) {
      this.data.address.region = this.region.name;
    }
    if (this.city) {
      this.data.address.city = this.city.name;
    }
    if (this.street) {
      this.data.address.street = this.street.name;
    }
    if (this.house) {
      this.data.address.house = this.house.name;
    }
  }

}
