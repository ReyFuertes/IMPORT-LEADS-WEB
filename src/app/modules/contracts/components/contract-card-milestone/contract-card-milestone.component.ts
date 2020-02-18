import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'il-contract-card-milestone',
  templateUrl: './contract-card-milestone.component.html',
  styleUrls: ['./contract-card-milestone.component.scss']
})

export class ContractCardMilestoneComponent implements OnInit {
  public estimatedDates: { from: string | Date, to: string | Date } = {
    from: moment('1/30/2020').format(),
    to: moment('2/2/2020').format()
  };
  public pointOfDates: string[] = [];
  public mileStoneDates: Array<{ date: string | Date }> = [
    {
      date: moment('1/28/2020').format()
    },
    {
      date: moment('2/5/2020').format()
    }
  ];
  constructor() { }

  ngOnInit() {
    const from = moment(this.estimatedDates.from);
    const to = moment(this.estimatedDates.to);

    var currDate = moment(from).startOf('day');
    var lastDate = moment(to).startOf('day');

    for (let index = 0; index <= Math.abs(currDate.diff(lastDate, 'days')); index++) {
      this.pointOfDates.push(currDate.clone().add(index, 'days').format('MM/DD/YYYY'));
    }
  }

  public getLen(len: number): number[] {
    return new Array(len);
  }
}
