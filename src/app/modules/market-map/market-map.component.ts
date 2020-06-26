import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
import HC_accessibility from 'highcharts/modules/accessibility';
HC_accessibility(Highcharts);
import HC_treemap from 'highcharts/modules/treemap';
HC_treemap(Highcharts);


@Component({
  selector: 'app-market-map',
  templateUrl: './market-map.component.html',
  styleUrls: ['./market-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MarketMapComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions = {}

  constructor() { }

  ngOnInit(): void {

    this.chartOptions = {
      series: [
        {
          type: "treemap",
          layoutAlgorithm: 'stripes',
          alternateStartingDirection: true,
          levels: [{
              level: 1,
              layoutAlgorithm: 'sliceAndDice',
              dataLabels: {
                  enabled: true,
                  align: 'left',
                  verticalAlign: 'top',
                  style: {
                      fontSize: '15px',
                      fontWeight: 'bold'
                  }
              }
          }],
          data: [{
              id: 'A',
              name: 'Apples',
              color: "#EC2500"
          }, {
              id: 'B',
              name: 'Bananas',
              color: "#ECE100",
          }, {
              id: 'O',
              name: 'Oranges',
              color: '#EC9800'
          }, {
              name: 'Anne',
              parent: 'A',
              value: 5
          }, {
              name: 'Rick',
              parent: 'A',
              value: 3
          }, {
              name: 'Peter',
              parent: 'A',
              value: 4
          }, {
              name: 'Anne',
              parent: 'B',
              value: 4
          }, {
              name: 'Rick',
              parent: 'B',
              value: 10,
              age:12
          }, {
              name: 'Peter',
              parent: 'B',
              value: 1
          }, {
              name: 'Anne',
              parent: 'O',
              value: 1
          }, {
              name: 'Rick',
              parent: 'O',
              value: 3
          }, {
              name: 'Peter',
              parent: 'O',
              value: 3
          }, {
              name: 'Susanne',
              parent: 'Kiwi',
              value: 2,
              color: '#9EDE00'
          }]
      }],
      title: {
          text: 'Fruit consumption'
      },
        tooltip: {
            useHTML: true,
            pointFormatter: function() {
                return `<div id="inTooltip_box">
                          <div id="header">
                            <h3>Tooltip${this.name}</h3>
                          </div>
                        </div>`;
            }
        }
    }
  }

}
