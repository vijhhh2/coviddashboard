import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-analytics-card-a',
  templateUrl: './analytics-card-a.component.html',
  styleUrls: ['./analytics-card-a.component.scss']
})
export class AnalyticsCardAComponent implements OnInit {

  @Input() title: string;
  @Input() count: number;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
