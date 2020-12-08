import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SickModel, Address, FullName} from '../models/sick.model';
import {IllnessModel} from '../../illness/models/illness.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SickApiService {

  constructor(private readonly http: HttpClient) {
  }

  createSick(
    fullName: FullName,
    region: string,
    city: string,
    street: string,
    house: string,
    illnesses: Array<IllnessModel>
  ): Observable<SickModel> {

    let address: Address = {id: null, region: region, city: city, street: street, house: house, lat: null, lon: null};
    let sick: SickModel = {id: null, fullName: fullName, address: address, illnesses: illnesses};

    return this.http.post<SickModel>(`${environment.api}/sick/`, sick);
  }

  deleteSick(sickModel: SickModel): Observable<void> {
    return this.http.delete<void>(`${environment.api}/sick/${sickModel.id}`);
  }

  updateSick(sickModel: SickModel): Observable<SickModel> {
    return this.http.put<SickModel>(`${environment.api}/sick/`, {
      id: sickModel.id,
      fullName: sickModel.fullName,
      address: sickModel.address
    });
  }

  changeIllnessDependency(sickId: number, addList: IllnessModel[], deleteList: IllnessModel[]): Observable<void> {
    let addString = this.getIllnessesString(addList);
    let deleteString = this.getIllnessesString(deleteList);
    let params = new HttpParams();
    if (addString) {
      params = params.append('add-illness', addString);
    }
    if (deleteString) {
      params = params.append('delete-illness', deleteString);
    }

    return this.http.put<void>(`${environment.api}/sick/${sickId}`, {}, {params: params});

  }

  getAllSickWithIllness(): Observable<Array<SickModel>> {
    return this.getSickByParameters(
      undefined,
      false,
      true,
      undefined,
      undefined,
      undefined,
      undefined);
  }

  getSickByParameters(
    illnessArray: Array<IllnessModel>,
    isIllnessTogether: boolean,
    concatIllness: boolean,
    region: string | undefined,
    city: string | undefined,
    street: string | undefined,
    house: string | undefined
  ): Observable<Array<SickModel>> {

    let params = new HttpParams();

    let illnessString = this.getIllnessesString(illnessArray);
    if (illnessString) {
      params = params.append('illness', illnessString);
    }
    if (isIllnessTogether) {
      params = params.append('illness-together', undefined);
    }
    if (concatIllness) {
      params = params.append('concat-illness', undefined);
    }
    if (region) {
      params = params.append('region', region);
    }
    if (city) {
      params = params.append('city', city);
    }
    if (street) {
      params = params.append('street', street);
    }
    if (house) {
      params = params.append('house', house);
    }

    return this.getSickByHttpParams(params);
  }

  private getSickByHttpParams(params: HttpParams): Observable<Array<SickModel>> {
    return this.http.get<Array<SickModel>>(`${environment.api}/sick`, {params: params});
  }

  private getIllnessesString(illnessArray: Array<IllnessModel>): string | undefined {
    if (illnessArray) {
      let illnesses = '';
      illnessArray.forEach(illness => illnesses += illness.id + ' ');
      return illnesses;
    }
    return undefined;
  }

}
