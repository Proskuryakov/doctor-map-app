export interface FiasServerResponseModel {

  result: Array<FiasAddressModel>

}

export interface FiasAddressModel {
  id: number,
  name: string
}

export enum ContentType {
  REGION = 'region',
  DISTRICT = 'district',
  CITY = 'city',
  STREET = 'street',
  BUILDING = 'building'
}
