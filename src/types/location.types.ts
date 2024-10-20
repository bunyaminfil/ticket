export type InitLocation = {
    loading: boolean;
    error: any;
    busLocations: ILocation[];
};
export interface ILocation {
    id: number;
    "parent-id": number;
    type: string;
    name: string;
    "geo-location": GeoLocation;
    zoom: number;
    "tz-code": string;
    "weather-code": any;
    rank: number;
    "reference-code": string;
    "city-id": number;
    "reference-country": any;
    "country-id": number;
    keywords: string;
    "city-name": string;
    languages: any;
    "country-name": string;
    code: any;
    "show-country": boolean;
    "area-code": any;
    "long-name": string;
    "is-city-center": boolean;
}

export interface GeoLocation {
    latitude: number;
    longitude: number;
    zoom: number;
}
export interface IStorageLocation {
  date: string;
  origin: ILocation;
  destination: ILocation;
}