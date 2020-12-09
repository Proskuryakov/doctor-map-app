import {Component, OnInit} from '@angular/core';
import {IllnessModel} from '../../../../features/illness/models/illness.model';
import {IllnessApiService} from '../../../../features/illness/services/illness-api.service';
import {StatisticsApiService} from '../../../../features/statistics/services/statistics-api.service';
import {CitySickCountModel} from '../../../../features/statistics/models/city-sick-count.model';

@Component({
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.sass']
})
export class StatisticsPage implements OnInit {
  error: boolean = false;
  loading: boolean = false;

  selectedIllness?: IllnessModel = undefined;
  allIllness: Array<IllnessModel>;
  isDescendingSort: string = 'true';
  citySickCountModels: Array<CitySickCountModel>;
  searchText: string;
  selectedIllnessName?: string = undefined;

  constructor(
    private readonly statisticsApiService: StatisticsApiService,
    private readonly illnessApiService: IllnessApiService
  ) {
  }

  ngOnInit(): void {
    this.display();
    this.illnessApiService.getAllIllness().subscribe(
      (illnesses) => {
        this.allIllness = illnesses;
      });
  }

  illnessSearch(): void {
    this.illnessApiService.getAllIllnessLikeName(this.searchText).subscribe(
      (illnesses) => this.allIllness = illnesses
    );
  }

  selectIllness(illness: IllnessModel): void {
    this.selectedIllness = illness;
  }

  deleteSelectedIllness(): void {
    this.selectedIllness = undefined;
  }

  display() {
    if (this.selectedIllness) {
      this.selectedIllnessName = this.selectedIllness.name;
    } else {
      this.selectedIllnessName = undefined;
    }
    this.loading = true;
    this.statisticsApiService.getCityStatistics(this.selectedIllness, JSON.parse(this.isDescendingSort))
      .subscribe((result) => {
        this.loading = false;
        this.citySickCountModels = result;
      }, () => {
        this.loading = false;
        this.error = true;
      });
  }

}
