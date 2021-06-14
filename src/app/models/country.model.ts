
export interface Country {
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
}

export interface CountryInfo {
  _id: number;
  country: string;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  flag: string;
}

export interface CountryWiseAnalytics {
  countries: string[];
  cases: number[];
  deaths: number[];
  recovered: number[];
}

export interface CountryHistory {
  country: string;
  timeline: Timeline;
}

export interface Timeline {
  cases: {[key: string]: number};
  deaths: {[key: string]: number};
}
