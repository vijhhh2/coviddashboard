import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { CoronaService } from 'src/app/services/corona.service';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-analytics-card-c-pie',
  templateUrl: './analytics-card-c-pie.component.html',
  styleUrls: ['./analytics-card-c-pie.component.scss']
})
export class AnalyticsCardCPieComponent implements OnInit, OnChanges {
  @Input() allCountries: { countryName: string; flag: string }[];
  @Input() breakPoints: string[];
  filteredCountries$: Observable<{ countryName: string; flag: string }[]>;
  countryName = new FormControl();
  selectedCountryData$: Observable<{
    countryName: string;
    data: { value: number; name: string }[];
  }>;
  todayDeathsAndCases: { name: string; type: string; data: number[] }[];
  todayDeathsAndCasesLabels = ['Today Cases', 'Today Deaths'];
  isLg = true;

  constructor(private coronaService: CoronaService) {}

  ngOnChanges() {
    if (this.breakPoints) {
      this.isLg = this.breakPoints.includes('lg');
    }
  }

  ngOnInit(): void {
    this.filteredCountries$ = this.countryName.valueChanges.pipe(
      map(countryName => {
        if (countryName === '') {
          return this.allCountries;
        } else {
          return this.allCountries.filter(country => {
            return country.countryName
              .toLowerCase()
              .includes(countryName.toLowerCase());
          });
        }
      })
    );
    this.selectedCountryData$ = this.coronaService
      .getCountryAnalytics('India')
      .pipe(
        tap(country => this.mapDataToBarValues(country)),
        map(country => this.mapDataToPieValues(country))
      );
    // didN't get data as I required
    // this.last5DaysCasesAndDeaths$ = this.coronaService.getLast5DaysCasesAndDeaths(
    //   'India'
    // );
  }

  onSelectCountry(event: MatAutocompleteActivatedEvent) {
    this.selectedCountryData$ = this.coronaService
      .getCountryAnalytics(event.option.value)
      .pipe(
        tap(country => this.mapDataToBarValues(country)),
        map(country => this.mapDataToPieValues(country))
      );
  }

  private mapDataToPieValues(country: Country) {
    if (country) {
      return {
        countryName: country.country,
        data: [
          { value: country.cases, name: 'Total Cases' },
          { value: country.deaths, name: 'Total Deaths' },
          { value: country.recovered, name: 'Total Recovered' }
        ]
      };
    }
  }
  private mapDataToBarValues(country: Country) {
    if (country) {
      {
        this.todayDeathsAndCases = [
          {
            name: country.country,
            type: 'bar',
            data: [country.todayCases, country.todayDeaths]
          }
        ];
      }
    }
  }
}
