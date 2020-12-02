import {Component, OnInit} from '@angular/core';
import {IllnessApiService} from '../../../../features/illness/services/illness-api.service';
import {IllnessModel} from '../../../../features/illness/models/illness.model';

@Component({
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.sass']
})
export class MapPage implements OnInit {

  constructor(private readonly illnessApiService: IllnessApiService) {
  }

  allIllnesses: Array<IllnessModel>;
  selectedIllnesses = new Set<IllnessModel>();

  ngOnInit(): void {

    this.illnessApiService.getAllIllness().subscribe(value => {
      this.allIllnesses = value;
    });

  }

  addSelectIllness(illness: IllnessModel) {
    this.selectedIllnesses.add(illness);
  }

  filterIllness(searchText: string) {
    this.illnessApiService.getAllIllnessLikeName(searchText).subscribe(value => {
      this.allIllnesses = value;
    });
  }

  handleFormSubmit() {

  }

  deleteIllnessFromSet(illness: IllnessModel) {
    this.selectedIllnesses.delete(illness);
  }
}
