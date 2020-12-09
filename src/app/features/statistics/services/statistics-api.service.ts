import {Injectable} from '@angular/core';
import {IllnessModel} from '../../illness/models/illness.model';
import {Observable} from 'rxjs';
import {CitySickCountModel} from '../models/city-sick-count.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsApiService {

  constructor(private readonly http: HttpClient) {
  }


  getCityStatistics(illness: IllnessModel, isDescendingSort: boolean): Observable<Array<CitySickCountModel>> {
    let params = new HttpParams().append('descending', String(isDescendingSort ? 1 : 0));

    if (illness) {
      params = params.append('illness', String(illness.id));
    }

    return this.http.get<Array<CitySickCountModel>>(`${environment.api}/statistics`, {params: params});
  }


}
