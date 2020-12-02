import {Component, OnInit} from '@angular/core';
import {IllnessApiService} from '../../../../features/illness/services/illness-api.service';
import {IllnessModel} from '../../../../features/illness/models/illness.model';
import {FiasAddressModel} from '../../../../features/address/models/fias-address.model';

@Component({
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.sass']
})
export class MapPage implements OnInit {

  constructor(private readonly illnessApiService: IllnessApiService) {
  }

  allIllnesses: Array<IllnessModel>;
  selectedIllnesses = new Set<IllnessModel>();
  region: FiasAddressModel | undefined = undefined;
  city: FiasAddressModel | undefined = undefined;
  street: FiasAddressModel | undefined = undefined;
  house: FiasAddressModel | undefined = undefined;
  isIllnessTogether: boolean = false;

  ngOnInit(): void {

    this.illnessApiService.getAllIllness().subscribe(value => {
      this.allIllnesses = value;
    });

  }

  addSelectIllness(illness: IllnessModel) {
    let isContain = false;
    this.selectedIllnesses.forEach(v => isContain ||= v.id === illness.id);

    if (!isContain) {
      this.selectedIllnesses.add(illness);
    }
  }

  filterIllness(searchText: string) {
    this.illnessApiService.getAllIllnessLikeName(searchText).subscribe(value => {
      this.allIllnesses = value;
    });
  }

  handleFormSubmit() {
    console.log('enter');
  }

  deleteIllnessFromSet(illness: IllnessModel) {
    this.selectedIllnesses.delete(illness);
    if (this.selectedIllnesses.size < 2) {
      this.isIllnessTogether = false;
    }
  }
}
