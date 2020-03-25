import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public menu: {
    label: string, children?: Array<{
      label: string, route?: () => void
    }>, route?: () => void
  };
  constructor() { }

  ngOnInit() {
    console.log(this.menu);
  }
}
