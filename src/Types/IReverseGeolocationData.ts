export interface IReversedGeoData {
  address: ILatitudeAndLongitudeAddress;
  lat: string;
  licence: string;
  lon: string;
  osm_id: string;
  osm_type: string;
  place_id: string;
}
export interface ILatitudeAndLongitudeAddress {
  city: string;
  city_district: string;
  country: string;
  country_code: string;
  postcode: string;
  quarter: string;
  road: string;
  state: string;
}
