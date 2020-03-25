import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})

export class TopNavComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public toolbarMenu: Array<{
    label: string, route?: () => void, children?: Array<{
      label: string, route?: () => void
    }>
  }>;
  constructor(private router: Router) { }

  ngOnInit() {
    this.toolbarMenu = [
      {
        label: 'AGREEMENTS',
        route: () => this.router.navigateByUrl('/dashboard/contracts'),
        children: [
          {
            label: 'TEMPLATES',
            route: () => this.router.navigateByUrl('/dashboard/templates'),
          },
          {
            label: 'TAGS',
            route: () => this.router.navigateByUrl('/dashboard/tags'),
          }
        ]
      },
      {
        label: 'ASSESMENTS',
        route: () => this.router.navigateByUrl('/dashboard/inspections'),
      },
      {
        label: 'DATA',
        route: () => this.router.navigateByUrl('dashboard/performance-insights'),
      },
      {
        label: 'VENUES',
        route: () => this.router.navigateByUrl('/dashboard/venues'),
      },
      {
        label: 'USERS',
        route: () => this.router.navigateByUrl('/dashboard/users'),
      }
    ];
  }
}
