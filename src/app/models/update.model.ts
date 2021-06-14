export interface Update {
  country: string;
  province: string;
  updatedAt: string;
  stats: Stats;
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Stats {
  confirmed: number;
  deaths: number;
  recovered: number;
}
