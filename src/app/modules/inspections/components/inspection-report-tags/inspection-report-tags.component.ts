import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export interface Tag {
  tag: string;
  failed: number;
  passed: number;
  failureRate: number;
  aQLimit: string;
}

const ELEMENT_DATA: Tag[] = [
  {
    tag: 'Appearance',
    failed: 2,
    passed: 49,
    failureRate: 4,
    aQLimit: 'X',
  },
  {
    tag: 'Materials',
    failed: 1,
    passed: 50,
    failureRate: 2,
    aQLimit: 'X',
  },
  {
    tag: 'Packaging',
    failed: 1,
    passed: 50,
    failureRate: 2,
    aQLimit: 'X',
  },
  {
    tag: 'Measurements',
    failed: 3,
    passed: 48,
    failureRate: 6,
    aQLimit: 'X',
  }
];

@Component({
  selector: 'il-inspection-report-tags',
  templateUrl: './inspection-report-tags.component.html',
  styleUrls: ['./inspection-report-tags.component.scss']
})

export class InspectionReportTagsComponent implements OnInit {

  public tagHeader: any[] = [
    { title: 'Total amount of tags', value: '4' },
    { title: 'Average failure rate', value: '5%' }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Apperance', 'Materials', 'Measurements', 'Packaging'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [49, 50, 48, 50], label: 'Passsed Items' },
    { data: [2, 1, 1, 3], label: 'Failed Items' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#B8D5CD' },
    { backgroundColor: '#740E05' },
  ];

  public graphData = [
    {
      dataConsume: 4,
      dataRemaining: 96,
      percent: 4
    },
    {
      dataConsume: 2,
      dataRemaining: 92,
      percent: 2
    },
    {
      dataConsume: 6,
      dataRemaining: 94,
      percent: 6
    },
    {
      dataConsume: 2,
      dataRemaining: 98,
      percent: 2
    }
  ];

  public displayedColumns: string[] = ['tag', 'failed', 'passed', 'failureRate', 'aQLimit'];
  public dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {

   }

}
