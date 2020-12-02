import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ContentType, FiasServerResponseModel, FiasAddressModel} from '../models/fias-address.model';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FiasAddressApiService {

  constructor(private readonly http: HttpClient) {
  }

  search(name: string, contentType: string, parentId: number): Observable<Array<FiasAddressModel>> {

    let params = new HttpParams();

    params = params.append('query', name);
    params = params.append('contentType', contentType);

    let parent = this.getParent(contentType);
    if (parent && parentId) {
      params = params.append(parent, String(parentId));
    }

    return this.http.get<FiasServerResponseModel>(
      environment.fias,
      {
        params: params
      }).pipe(map(r => r.result));

  }


  private getParent(contentType: string): string {
    switch (contentType) {
      case ContentType.REGION:
        return undefined;
      case ContentType.DISTRICT:
        return `${ContentType.REGION}Id`;
      case ContentType.CITY:
        return `${ContentType.REGION}Id`;
      case ContentType.STREET:
        return `${ContentType.CITY}Id`;
      case ContentType.BUILDING:
        return `${ContentType.STREET}Id`;
    }
  }

}
