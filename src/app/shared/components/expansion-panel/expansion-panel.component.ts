import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})

export class ExpansionPanelComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public data: any[] =[
    {
      title: '2G1W Dimmer Picture',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Rated Voltage',
      description: '<500W'
    },
    {
      title: 'Ive seen other answers suggesting animating',
      description: 'Start editing to see some magic happen :).'
    },
    {
      title: 'In case anyone is reading this',
      description: 'transition '
    }
  ];
  public selectedPnl: number | null;

  constructor() { }

  ngOnInit() { }

  public onCollapsePnl(pnl: any): void {
    pnl.expanded = false
  }

  public isEventDialog: boolean = false;
  public expandPanel(pnl: any): void {
    event.stopPropagation();
    if(this.isEventDialog) {
      pnl.expanded = true;
      this.isEventDialog = false;
    } else {
      pnl.expanded = pnl.expanded;
    }
  }
}
