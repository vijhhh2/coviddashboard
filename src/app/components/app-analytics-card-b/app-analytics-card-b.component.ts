import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-app-analytics-card-b',
  templateUrl: './app-analytics-card-b.component.html',
  styleUrls: ['./app-analytics-card-b.component.scss']
})
export class AppAnalyticsCardBComponent implements OnChanges {
  @Input() dataAxis: string[];
  @Input() cases: number[];
  @Input() deaths: number[];
  @Input() recovered: number[];
  @Input() breakpoints: string[];
  isLg: boolean;
  series: {
    name: string;
    type: string;
    barGap: number,
    data: number[];
  }[] = [];

  constructor() { }

  ngOnChanges(): void {
    if (this.breakpoints) {
      this.isLg = this.breakpoints.includes('lg');
    }
    this.series = [
      {
        barGap: 0.5,
        type: 'bar',
        name: 'Total Cases',
        data: this.cases
      },
      {
        barGap: 0.5,
        type: 'bar',
        name: 'Total Deaths',
        data: this.deaths
      },
      {
        barGap: 0.5,
        type: 'bar',
        name: 'Total Recovered',
        data: this.recovered
      }
    ];

  }

}
