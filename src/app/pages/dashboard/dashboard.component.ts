import { Component, OnInit } from '@angular/core';
import { CoronaService } from 'src/app/services/corona.service';
import { Observable, of } from 'rxjs';
import { All } from 'src/app/models/all.model';
import { CountryWiseAnalytics } from 'src/app/models/country.model';
import { Update } from 'src/app/models/update.model';
import { MediaObserver } from '@angular/flex-layout';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allAnalytics$: Observable<All>;
  allCountriesTotalCases$: Observable<CountryWiseAnalytics>;
  allCountries$: Observable<{ countryName: string; flag: string }[]>;
  updates$: Observable<Update[]>;
  loading = false;
  breakPoints$: Observable<string[]>;

  constructor(private coronaService: CoronaService, private mediaObserver: MediaObserver) {}

  ngOnInit(): void {
    this.breakPoints$ = this.mediaObserver.asObservable().pipe(
      map(changes => changes.map(change => change.mqAlias)),
    );
    this.loading = true;
    this.coronaService.getAllData().subscribe(([res1, res2, res3]) => {
      this.allAnalytics$ = of(res1);
      this.coronaService.setUpdatedAllCountryAnalytics(res2);
      this.updates$ = of(res3);
      this.allCountriesTotalCases$ = this.coronaService.getTop15CountriesTotalCases();
      this.allCountries$ = this.coronaService.getCountries();
      this.loading = false;
    });
  }
}
