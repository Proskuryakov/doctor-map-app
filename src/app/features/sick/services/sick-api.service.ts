import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SickModel} from '../models/sick.model';
import {IllnessModel} from '../../illness/models/illness.model';
import {SickModule} from '../sick.module';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SickApiService {

  constructor(private readonly http: HttpClient) {
  }

  getSickByParameters(
    illnessArray: Array<IllnessModel>,
    isIllnessTogether: boolean,
    concatIllness:boolean,
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
