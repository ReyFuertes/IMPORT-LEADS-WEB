import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'il-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.scss']
})

export class ContractCardComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  constructor(private router: Router) { }

  ngOnInit() { }

  public gotoDetail(id: string): void {
    this.router.navigateByUrl(`dashboard/contracts/${id}/detail`);
  }
}
