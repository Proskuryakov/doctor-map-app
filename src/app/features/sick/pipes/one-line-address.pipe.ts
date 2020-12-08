import {Pipe, PipeTransform} from '@angular/core';
import {Address} from '../models/sick.model';

@Pipe({
  name: 'oneLineAddress'
})
export class OneLineAddressPipe implements PipeTransform {

  transform(value: Address | undefined): string | undefined {
    if (value == undefined) {
      return undefined;
    }

    return `${value.region} обл., г.${value.city}, ул.${value.street}, д.${value.house}`;
  }

}
