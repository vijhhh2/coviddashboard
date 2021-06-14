import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { graphic, EChartOption } from 'echarts';

@Component({
  selector: 'app-horizantal-bar-chart',
  templateUrl: './horizantal-bar-chart.component.html',
  styleUrls: ['./horizantal-bar-chart.component.scss'],
})
export class HorizantalBarChartComponent implements OnChanges {
  options: any = {};
  @Input() dataAxis: string[];
  @Input() isLg: boolean;
  @Input() data: {
    name: string;
    type: string;
    barGap: 0;
    data: number[];
  }[];

  constructor() {}

  ngOnChanges() {
    this.options = {
      title: {
        text: 'Total cases in top 15 countries',
      },
      tooltip: {
        trigger: 'axis ',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        show: true,
        data: this.dataAxis,
        boundaryGap: true,
        axisLabel: {
          show: true,
          interval: this.isLg ? '0' : 'auto',
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: '#999',
          },
          formatter: (value, pointer) => {
            return this.isLg ? value : this.changeNumberFormat(value);
          },
        },
      },
      series: [
        ...this.data.map((eachSeries) => ({
          ...eachSeries,
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
        })),
      ],
    };
  }

  /**
   * Returns a number in Indian numbering system as a String
   *
   * @param no The integer to be converted.
   * @param decimals The number of digits needed after decimal point.
   */
  changeNumberFormat(no: number, decimals?: number, recursiveCall?) {
    const decimalPoints = decimals || 2;
    const noOfLakhs = no / 100000;
    let displayStr: any;
    let isPlural: boolean;

    // Rounds off digits to decimalPoints decimal places
    function roundOf(integer) {
      return +integer.toLocaleString(undefined, {
        minimumFractionDigits: decimalPoints,
        maximumFractionDigits: decimalPoints,
      });
    }

    if (noOfLakhs >= 1 && noOfLakhs <= 99) {
      const lakhs = roundOf(noOfLakhs);
      isPlural = lakhs > 1 && !recursiveCall;
      displayStr = `${lakhs} L`;
    } else if (noOfLakhs >= 100) {
      const crores = roundOf(noOfLakhs / 100);
      const crorePrefix =
        crores >= 100000 ? this.changeNumberFormat(crores, decimals, true) : crores;
      isPlural = crores > 1 && !recursiveCall;
      displayStr = `${crorePrefix} C`;
    } else {
      displayStr = roundOf(+no);
    }

    return displayStr;
  }
}
