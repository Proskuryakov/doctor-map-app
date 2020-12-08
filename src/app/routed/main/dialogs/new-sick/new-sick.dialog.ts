import {Component, OnInit} from '@angular/core';
import {FiasAddressModel} from '../../../../features/address/models/fias-address.model';
import {FullName} from '../../../../features/sick/models/sick.model';
import {IllnessModel} from '../../../../features/illness/models/illness.model';
import {IllnessApiService} from '../../../../features/illness/services/illness-api.service';
import {SickApiService} from '../../../../features/sick/services/sick-api.service';

@Component({
  templateUrl: './new-sick.dialog.html',
  styleUrls: ['./new-sick.dialog.sass']
})
export class NewSickDialog implements OnInit {

  allIllnesses: Array<IllnessModel>;
  selectedIllnesses = new Array<IllnessModel>();

  region: FiasAddressModel | undefined = undefined;
  city: FiasAddressModel | undefined = undefined;
  street: FiasAddressModel | undefined = undefined;
  house: FiasAddressModel | undefined = undefined;

  fullName: FullName = {surname: '', namePatronymic: ''};

  loading: boolean = false;
  error: boolean = false;
  message: boolean = false;
  messageText: string;

  constructor(
    private readonly illnessApiService: IllnessApiService,
    private readonly sickApiService: SickApiService
  ) {
  }

  ngOnInit(): void {
    this.illnessApiService.getAllIllness().subscribe(value => {
      this.allIllnesses = value;
    });

  }

  addSelectedIllness(illness: IllnessModel) {
    this.error = false;
    let isContain = false;
    this.selectedIllnesses.forEach(v => isContain ||= v.id === illness.id);

    if (!isContain) {
      this.selectedIllnesses.push(illness);
    }
  }

  filterIllness(searchText: string) {
    this.illnessApiService.getAllIllnessLikeName(searchText).subscribe(value => {
      this.allIllnesses = value;
    });
  }

  deleteSelectedIllness(illness: IllnessModel) {
    this.error = false;
    this.selectedIllnesses = this.selectedIllnesses.filter(i => i != illness);
  }

  checkField(): void {
    if (!this.region) {
      this.city = undefined;
    }
    if (!this.city) {
      this.street = undefined;
    }
    if (!this.street) {
      this.house = undefined;
    }
  }

  isFormNotValid(): boolean {
    return !(this.house &&
      this.selectedIllnesses.length > 0 &&
      this.fullName.surname.trim() != '' &&
      this.fullName.namePatronymic.trim() != '');
  }

  createNewSick(): void {
    this.messageText = ''
    this.loading = true;
    this.message = false;
    this.error = false;
    this.sickApiService.createSick(
      this.fullName,
      this.region.name,
      this.city.name,
      this.street.name,
      this.house.name,
      this.selectedIllnesses
    ).subscribe(() => {
      this.loading = false;
      this.message = true;
      this.messageText = 'Больной успешно добавлен';
    }, () => {
      this.loading = false;
      this.error = true;
      this.messageText = 'Произошла ошибка при добавлении';
    });
  }
}
