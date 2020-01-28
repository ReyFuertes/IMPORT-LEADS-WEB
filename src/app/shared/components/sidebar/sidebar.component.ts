import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public menus: Array<{ name: string, icon?: string }> = [
    {
      name: 'contracts',
      icon: 'doc-icon-white.svg'
    },
    {
      name: 'inspections',
      icon: 'search-icon-white.svg'
    },
    {
      name: 'templates',
      icon: 'templates-icon-white.svg'
    },
    {
      name: 'tags',
      icon: 'tag-icon-white.svg'
    },
    {
      name: 'venues',
      icon: 'venues-icon-white.svg'
    },
    {
      name: 'users',
      icon: 'user-icon-white.svg'
    },
    {
      name: 'performance insights',
      icon: 'performance-icon-white.svg'
    },
    {
      name: 'inspection insights',
      icon: 'graph-icon-white.svg'
    }
  ];
  constructor() { }

  ngOnInit() { }
}
