import {Injectable} from '@angular/core';
import {IllnessModel} from '../models/illness.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IllnessApiService {

  constructor(private readonly http: HttpClient) {
  }

  getAllIllness(): Observable<Array<IllnessModel>> {
    return this.http.get<Array<IllnessModel>>(
      `${environment.api}/illness/`
    );
  }

  getAllIllnessLikeName(searchText: string): Observable<Array<IllnessModel>> {
    return this.http.get<Array<IllnessModel>>(
      `${environment.api}/illness/`, {params: new HttpParams().set('name', searchText)}
    );
  }

  createIllness(illness: IllnessModel): Observable<IllnessModel> {
    return this.http.post<IllnessModel>(
      `${environment.api}/illness/`, {
        name: illness.name,
        color: illness.color
      }
    );
  }

  updateIllness(illness: IllnessModel): Observable<IllnessModel> {
    return this.http.put<IllnessModel>(`${environment.api}/illness`, illness);
  }

  deleteIllness(illness: IllnessModel): Observable<void> {
    return this.http.delete<void>(`${environment.api}/illness/${illness.id}`);
  }

}
