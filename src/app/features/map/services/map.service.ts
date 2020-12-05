import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import {Observable, pipe} from 'rxjs';
import {SickApiService} from '../../sick/services/sick-api.service';
import {IllnessModel} from '../../illness/models/illness.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CoordinatesModel} from '../models/coordinates.model';
import {flatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {SickModel} from '../../sick/models/sick.model';
import {Marker} from '../models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  defaultView = L.latLng(51.6605982, 39.2005858);
  defaultScale = 10;

  view = this.defaultView;
  scale = this.defaultScale;

  constructor(
    private readonly sickApiService: SickApiService,
    private readonly http: HttpClient
  ) {
  }

  getMarkers(
    selectedIllness: Array<IllnessModel>,
    isIllnessTogether: boolean,
    region: string | undefined,
    city: string | undefined,
    street: string | undefined,
    house: string | undefined
  ): Observable<Array<L.MarkerClusterGroup>> {

    return this.sickApiService.getSickByParameters(
      selectedIllness,
      isIllnessTogether,
      true,
      region,
      city,
      street,
      house)
      .pipe(
        map((sicks) => this.generateMarkers(selectedIllness, isIllnessTogether, sicks))
      );

  }

  changeView(
    region: string | undefined,
    city: string | undefined,
    street: string | undefined,
    house: string | undefined
  ): Observable<[L.LatLng, number]> {

    let params = new HttpParams();

    params = params.append('region', region);
    this.scale = 8;
    if (city) {
      params = params.append('city', city);
      this.scale = 10;
      if (street) {
        params = params.append('street', street);
        this.scale = 13;
        if (house) {
          params = params.append('house', house);
          this.scale = 16;
        }
      }
    }

    return this.http.get<CoordinatesModel>(`${environment.api}/geocoding`, {params: params})
      .pipe(
        map((coordinates) => {
          this.view = L.latLng(coordinates.lat, coordinates.lon);
          return [this.view, this.scale];
        })
      );
  }

  private generateMarkers(
    selectedIllnesses: Array<IllnessModel>,
    isIllnessTogether: boolean,
    sicks: SickModel[]
  ): Array<L.MarkerClusterGroup> {

    let groups = new Array<L.MarkerClusterGroup>();

    if (selectedIllnesses.length == 0) {

      let markers = L.markerClusterGroup();

      for (let sick of sicks) {
        let coordinates = L.latLng(sick.address.lat, sick.address.lon);
        for (let illness of sick.illnesses) {

          markers.addLayer(L.marker(coordinates, {icon: this.getStandardIcon(illness.color)}));
        }
      }

      groups.push(markers);

    } else if (isIllnessTogether) {

      let markers = new L.markerClusterGroup();

      let icon = this.getStandardIcon(selectedIllnesses[0].color);
      for (let sick of sicks) {
        markers.addLayer(L.marker(L.latLng(sick.address.lat, sick.address.lon), {icon: icon}));
      }

      groups.push(markers);

    } else {
      let markers = new L.markerClusterGroup();

      for (let illness of selectedIllnesses) {

        let icon = this.getStandardIcon(illness.color);

        sicks
          .filter(sick => {
            for (let i of sick.illnesses) {
              if (i.id === illness.id) {
                return true;
              }
            }
            return false;
          })
          .forEach(sick => markers.addLayer(L.marker(L.latLng(sick.address.lat, sick.address.lon), {icon: icon})));

        groups.push(markers);
      }
    }

    return groups;

  }

  private getStandardIcon(color: string): L.DivIcon {
    const markerHtmlStyles = `
    background-color: ${color};
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    left: -0.75rem;
    top: -0.75rem;
    position: relative;
    border-radius: 1.5rem 1.5rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;

    return L.divIcon({
      className: 'my-custom-pin',
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`
    });
  }


}
