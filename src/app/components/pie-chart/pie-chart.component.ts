import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges {

  options = {};

  @Input() countryData: {
    countryName: string,
    data: {value: number, name: string}[]
  };
  @Input() isLg: boolean;

  constructor() {}

  ngOnChanges() {
    if (this.countryData) {
      this.options = {
        title: {
            text: this.countryData.countryName,
            left: this.isLg ? 'right' : 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        series: [
            {
                name: this.countryData.countryName,
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: this.countryData.data
                ,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    }
  }

}
