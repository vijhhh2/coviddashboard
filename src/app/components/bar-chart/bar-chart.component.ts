import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges {
  @Input() dataAxis: string[];
  @Input() series: {name: string, type: string, data: number[]}[];
  options = {};

  constructor() { }

  ngOnChanges(): void {
    this.options = {
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
      },
      yAxis: {
          type: 'category',
          data: this.dataAxis
      },
      series: this.series
  };
  }

}
