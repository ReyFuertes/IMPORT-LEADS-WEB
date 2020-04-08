import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'il-contract-card-milestone',
  templateUrl: './contract-card-milestone.component.html',
  styleUrls: ['./contract-card-milestone.component.scss']
})

export class ContractCardMilestoneComponent implements OnInit {
  public estimatedDates: { from: string | Date, to: string | Date } = {
    from: moment('4/1/2020').format(),
    to: moment('4/30/2020').format()
  };
  public pointOfDates: string[] = [];
  public mileStoneDates: string[] = [
    moment('4/01/2020').format('MM/DD/YYYY'),
    moment('4/02/2020').format('MM/DD/YYYY'),
    moment('4/15/2020').format('MM/DD/YYYY'),
    moment('4/30/2020').format('MM/DD/YYYY')
  ];
  constructor() { }

  public getTooltip(date: any, i: number): any {
    return this.mileStoneDates.includes(date) ? date + ' : ' + (i === 0 ? 'Start Date' : ((this.pointOfDates.length - 1) === i ? 'Delivery Date' : 'Milestone Name')) : ''
  }

  ngOnInit() {
    const from = moment(this.estimatedDates.from);
    const to = moment(this.estimatedDates.to);

    var currDate = moment(from).startOf('day');
    var lastDate = moment(to).startOf('day');

    for (let index = 0; index <= Math.abs(from.diff(to, 'days')); index++) {
      this.pointOfDates.push(currDate.clone().add(index, 'days').format('MM/DD/YYYY'));
    }
    console.log(this.pointOfDates);
    console.log(this.mileStoneDates);
  }

  public getLen(len: number): number[] {
    return new Array(len);
  }
}
