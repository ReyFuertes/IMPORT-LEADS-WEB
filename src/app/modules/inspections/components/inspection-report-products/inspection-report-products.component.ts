import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export interface Product {
  product: string;
  failed: number;
  passed: number;
}

const ELEMENT_DATA: Product[] = [
  {
    product: 'Lazergun > Green',
    failed: 2,
    passed: 28
  },
  {
    product: 'Lazergun > Green',
    failed: 2,
    passed: 28
  },
  {
    product: 'Lazergun > Green',
    failed: 2,
    passed: 28
  },
  {
    product: 'Lazergun > Green',
    failed: 2,
    passed: 28
  }
];

@Component({
  selector: 'il-inspection-report-products',
  templateUrl: './inspection-report-products.component.html',
  styleUrls: ['./inspection-report-products.component.scss']
})

export class InspectionReportProductsComponent implements OnInit {

  public productHeader: any[] = [
    { title: 'Total items', value: '58' },
    { title: 'Failed items', value: '12' },
    { title: 'Pass Items', value: '46'}
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Lasergun > Green', 'Lasergun > Blue', 'Lasergun > Orange', 'Lasergun > Yellow'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [28, 2, 12, 1], label: 'Passsed Items' },
    { data: [2, 5, 3, 5], label: 'Failed Items' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#B8D5CD' },
    { backgroundColor: '#740E05' },
  ];

  public displayedColumns: string[] = ['product', 'failed', 'passed'];
  public dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() { }
}
