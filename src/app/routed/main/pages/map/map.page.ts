import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IllnessApiService} from '../../../../features/illness/services/illness-api.service';
import {IllnessModel} from '../../../../features/illness/models/illness.model';
import {FiasAddressModel} from '../../../../features/address/models/fias-address.model';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import {MapService} from '../../../../features/map/services/map.service';

@Component({
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.sass']
})
export class MapPage implements OnInit, AfterViewInit {

  private map;
  markers = new Array<L.MarkerClusterGroup>();

  allIllnesses: Array<IllnessModel>;
  selectedIllnesses = new Array<IllnessModel>();
  region: FiasAddressModel | undefined = undefined;
  city: FiasAddressModel | undefined = undefined;
  street: FiasAddressModel | undefined = undefined;
  house: FiasAddressModel | undefined = undefined;
  isIllnessTogether: boolean = false;

  loading: boolean = false;
  error: boolean = false;

  constructor(
    private readonly mapService: MapService,
    private readonly illnessApiService: IllnessApiService
  ) {
  }

  ngOnInit(): void {
    this.illnessApiService.getAllIllness().subscribe(value => {
      this.allIllnesses = value;
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

    this.map = L.map('map');
    this.map.setView(this.mapService.defaultView, this.mapService.defaultScale);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
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
    if (this.selectedIllnesses.length < 2) {
      this.isIllnessTogether = false;
    }
  }


  handleFormSubmit() {
    this.markers.forEach(m => m.clearLayers());
    this.changeView();
    this.getMarkers();

  }

  private getMarkers(): void {
    this.loading = true;
    this.error = false;

    this.mapService.getMarkers(
      this.selectedIllnesses,
      this.isIllnessTogether,
      this.region?.name,
      this.city?.name,
      this.street?.name,
      this.house?.name
    ).subscribe((result) => {
      this.loading = false;
      this.markers = result;
      result.forEach(markerClusterGroup => this.map.addLayer(markerClusterGroup));
    }, () => {
      this.loading = false;
      this.error = true;
    });

  }

  private changeView() {
    if (this.region) {
      this.mapService.changeView(
        this.region.name,
        this.city?.name,
        this.street?.name,
        this.house?.name
      ).subscribe(
        (result) => {
          this.map.setView(result[0], result[1]);
          console.log(result[0]);
          console.log(result[1]);
        },
        () => this.map.setView(this.mapService.defaultView, this.mapService.defaultScale)
      );
    }
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

  clearFields() {
    this.region = undefined;
    this.checkField();
    this.selectedIllnesses = new Array<IllnessModel>();
  }
}
