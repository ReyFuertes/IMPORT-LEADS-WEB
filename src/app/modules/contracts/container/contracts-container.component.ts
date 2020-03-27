import { loadContracts } from './../store/contracts.action';
import { AppState } from './../../../store/app.reducer';
import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'il-contracts-container',
  templateUrl: './contracts-container.component.html',
  styleUrls: ['./contracts-container.component.scss']
})

export class ContractsContainerComponent extends GenericContainer implements OnInit {
  constructor(private store: Store<AppState>) {
    super();
    this.store.dispatch(loadContracts());

  }
}
