import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-contract-detail-page',
  templateUrl: './contract-detail-page.component.html',
  styleUrls: ['./contract-detail-page.component.scss']
})

export class ContractDetailPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public actionOptions: Array<{ label: string, icon: string, event?: () => void }> = [
    {
      label: 'Edit contract',
      icon: 'edit-icon-blue.svg'
    },
    {
      label: 'Add a category',
      icon: 'add-category-icon-blue.svg'
    },
    {
      label: 'Add a title',
      icon: 'add-title-icon-blue.svg'
    },
    {
      label: 'Download',
      icon: 'download-icon-blue.svg'
    },
    {
      label: 'Create or update template',
      icon: 'templates-icon-blue.svg'
    },
    {
      label: 'Delete contract',
      icon: 'delete-icon-red.svg'
    }
  ];
  constructor() { }

  ngOnInit() { }
}
