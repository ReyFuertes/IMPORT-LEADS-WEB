import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-contracts-container',
  templateUrl: './contracts-container.component.html',
  styleUrls: ['./contracts-container.component.scss']
})

export class ContractsContainerComponent extends GenericContainer implements OnInit {
  constructor() {
    super();
  }
}
