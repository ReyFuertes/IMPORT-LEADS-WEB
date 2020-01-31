import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-contract-detail-page',
  templateUrl: './contract-detail-page.component.html',
  styleUrls: ['./contract-detail-page.component.scss']
})

export class ContractDetailPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public actionOptions: Array<{ id: number, label: string, icon: string }> = [
    {
      id: 1,
      label: 'Edit contract',
      icon: 'edit-icon-blue.svg'
    },
    {
      id: 2,
      label: 'Add a category',
      icon: 'add-category-icon-blue.svg'
    },
    {
      id: 3,
      label: 'Add a title',
      icon: 'add-title-icon-blue.svg'
    },
    {
      id: 4,
      label: 'Download',
      icon: 'download-icon-blue.svg'
    },
    {
      id: 5,
      label: 'Create or update template',
      icon: 'templates-icon-blue.svg'
    },
    {
      id: 6,
      label: 'Delete contract',
      icon: 'delete-icon-red.svg'
    }
  ];
  public _showTabActions: boolean = false;
  public panels: Array<{ title: string, description: string }> = [
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
  constructor() { }

  ngOnInit() { }

  public add(): void {
    this.panels.push({ title: 'test title 123', description: 'test description 123' });
  }

  public showTabActions(): void {
    this._showTabActions != this._showTabActions;
  }
}
