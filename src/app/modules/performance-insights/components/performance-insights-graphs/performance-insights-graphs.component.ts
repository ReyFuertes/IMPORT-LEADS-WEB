import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'il-performance-insights-graphs',
  templateUrl: './performance-insights-graphs.component.html',
  styleUrls: ['./performance-insights-graphs.component.scss']
})
export class PerformanceInsightsGraphsComponent implements OnInit {
  /* amount bar chart */
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }],
      xAxes: [{
        gridLines: {
            display: false
        }
      }],
    }
  };
  public barChartLabels: Label[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29', '30', '01' ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: ''
    },
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: '',
    },
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: ''
    },
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: ''
    },
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: 'Amount of due'
    }
  ];
  public barChartColors: Color[] = [
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' }
  ];

  /* Contracts bar chart */
  public barChartOptionsContracts: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }],
      xAxes: [{
        gridLines: {
            display: false
        }
      }],
    }
  };
  public barChartLabelsContracts: Label[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29', '30', '01' ];
  public barChartTypeContracts: ChartType = 'bar';
  public barChartLegendContracts = false;
  public barChartPluginsContracts = [];
  public barChartDataContracts: ChartDataSets[] = [
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: ''
    },
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: '',
    },
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: ''
    },
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: ''
    },
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: 'Amount of due'
    }
  ];
  public barChartColorsContracts: Color[] = [
    { backgroundColor: '#7ae0c0' },
    { backgroundColor: '#7ae0c0' },
    { backgroundColor: '#7ae0c0' },
    { backgroundColor: '#7ae0c0' },
    { backgroundColor: '#7ae0c0' }
  ];

  /* failure line chart */
  public lineChartLabels: Label[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29', '30', '01' ];
  public lineChartData: ChartDataSets[] = [
    {
      data: [
        15, 17, 19, 11, 12, 12, 13, 12, 14, 15, 15, 12, 18, 10, 10, 18, 16,
        18, 18, 18, 11, 12, 12, 13, 14, 14, 15, 15, 12, 11, 12
      ],
    },
    {
      data: [
        22, 21, 21, 21, 22, 22, 23, 24, 24, 25, 25, 22, 28, 20, 20, 28, 26,
        28, 28, 28, 21, 22, 22, 23, 24, 24, 25, 25, 22, 21, 22
      ],
      label: '',
    },
    {
      data: [
        31, 31, 31, 33, 32, 32, 33, 34, 34, 35, 35, 32, 38, 39, 30, 38, 36,
        38, 38, 38, 31, 32, 32, 33, 34, 34, 35, 35, 32, 31, 32
      ],
      label: ''
    }
  ];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(240, 83, 80,0.5)',
      borderColor: 'rgba(240, 83, 80,1)',
      pointBackgroundColor: 'rgba(240, 83, 80,1)',
      pointHoverBorderColor: 'rgba(240, 83, 80,0.8)'
    },
    {
      backgroundColor: 'rgba(34, 204, 150,0.5)',
      borderColor: 'rgba(34, 204, 150,1)',
      pointBackgroundColor: 'rgba(34, 204, 150,1)',
      pointHoverBorderColor: 'rgba(34, 204, 150,0.8)'
    },
    {
      backgroundColor: 'rgba(142, 193, 217,0.5)',
      borderColor: 'rgba(142, 193, 217,1)',
      pointBackgroundColor: 'rgba(142, 193, 217,1)',
      pointHoverBorderColor: 'rgba(142, 193, 217,0.8)'
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  constructor() { }

  ngOnInit() {
  }

}
