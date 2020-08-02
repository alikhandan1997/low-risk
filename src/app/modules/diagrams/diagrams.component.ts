import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.scss']
})
export class DiagramsComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  pieOptions = {}
  lineOptions = {}

  constructor() { }

  ngOnInit(): void {
    this.pieOptions = {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          backgroundColor: 'rgb(230, 227, 227)',
      },
      title: {
          text: 'Browser<br>shares<br>2017',
          align: 'center',
          verticalAlign: 'middle',
          y: 60
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                      fontWeight: 'bold',
                      color: 'white'
                  }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%'],
              size: '110%'
          }
      },
      series: [{
          type: 'pie',
          name: 'Browser share',
          innerSize: '50%',
          data: [
              ['Chrome', 58.9],
              ['Firefox', 13.29],
              ['Internet Explorer', 13],
              ['Edge', 3.78],
              ['Safari', 3.42],
              {
                  name: 'Other',
                  y: 7.61,
                  dataLabels: {
                      enabled: false
                  }
              }
          ]
      }]
    }

    this.lineOptions = {
      chart: {
        backgroundColor: 'rgb(230, 227, 227)',
        type: 'line'
      },
      title: {
          text: 'Logarithmic axis demo'
      },

      xAxis: {
          tickInterval: 1,
          type: 'logarithmic',
          accessibility: {
              rangeDescription: 'Range: 1 to 10'
          }
      },

      yAxis: {
          type: 'logarithmic',
          minorTickInterval: 0.1,
          accessibility: {
              rangeDescription: 'Range: 0.1 to 1000'
          }
      },

      tooltip: {
          headerFormat: '<b>{series.name}</b><br />',
          pointFormat: 'x = {point.x}, y = {point.y}'
      },

      series: [{
          data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
          pointStart: 1
      }]
    }
  }

}
