import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-performance-insights-quick-wins',
  templateUrl: './performance-insights-quick-wins.component.html',
  styleUrls: ['./performance-insights-quick-wins.component.scss']
})
export class PerformanceInsightsQuickWinsComponent implements OnInit {

  public wins: string[] = [
    '10% decrease in cat 3 win $10 000',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'Lorem Ipsum is simply dummy text of the printing industry.',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  ];
  constructor() { }

  ngOnInit() {
  }

}
