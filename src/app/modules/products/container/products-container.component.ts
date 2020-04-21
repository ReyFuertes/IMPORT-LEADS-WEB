import { GenericContainer } from './../../../shared/generics/generic-container';
import { Store } from '@ngrx/store';
import { AppState } from './../../../store/app.reducer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss']
})

export class ProductsContainerComponent extends GenericContainer implements OnInit {
  constructor(private store: Store<AppState>) {
    super();
  }
}

