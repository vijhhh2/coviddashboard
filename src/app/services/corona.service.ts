import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { All } from '../models/all.model';
import { Country, CountryWiseAnalytics } from '../models/country.model';
import { Update } from '../models/update.model';


@Injectable({
  providedIn: 'root'
})
export class CoronaService {
  private allCountryAnalytics: Country[] = [];
  private updatedAllCountryAnalytics = new BehaviorSubject<Country[]>(this.allCountryAnalytics);

  constructor(private http: HttpClient) {}

  getAllAnalytics() {
    return this.http.get<All>('https://corona.lmao.ninja/v2/all');
  }

  getAllCountriesAnalytics() {
    return this.http.get<Country[]>('https://corona.lmao.ninja/v2/countries?sort=cases');
  }

  getCountries(): Observable<{countryName: string, flag: string}[]> {
    return this.updatedAllCountryAnalytics.pipe(
      map((countries: Country[]) =>
        countries.map(country => ({
          countryName: country.country,
          flag: country.countryInfo.flag
        }))
      )
    );
  }

  getTop15CountriesTotalCases(): Observable<CountryWiseAnalytics> {
    return this.updatedAllCountryAnalytics.pipe(
      map(countries => {
        return {
          countries: countries.map(country => country.country).slice(0, 15),
          cases: countries.map(country => country.cases).slice(0, 15),
          deaths: countries.map(country => country.deaths).slice(0, 15),
          recovered: countries.map(country => country.recovered).slice(0, 15),
        };
      }),
    );
  }

  getCountryAnalytics(selectedCountry: string): Observable<Country> {
    return this.updatedAllCountryAnalytics.pipe(
      map(countries => countries.filter(country => country.country === selectedCountry)[0])
    );
  }

  getCoronaUpdates() {
    return this.http.get<Update[]>('https://corona.lmao.ninja/v2/jhucsse');
  }

  setUpdatedAllCountryAnalytics(countries: Country[]) {
    this.allCountryAnalytics = countries;
    this.updatedAllCountryAnalytics.next(this.allCountryAnalytics);
  }

  getAllData() {
    return forkJoin([
      this.getAllAnalytics(),
      this.getAllCountriesAnalytics(),
      this.getCoronaUpdates()
    ]);
  }

}
