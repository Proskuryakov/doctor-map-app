import {IllnessModel} from '../../illness/models/illness.model';

export interface SickModel {

  id: number,
  fullName: FullName,
  address: Address,
  illnesses: Array<IllnessModel>

}

export interface FullName {
  surname: string,
  namePatronymic: string,
}

export interface Address {
  id: number,
  region: string,
  city: string,
  street: string,
  house: string,
  lat: number,
  lon: number
}
