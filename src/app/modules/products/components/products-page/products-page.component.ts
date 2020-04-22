import { Observable } from 'rxjs';
import { getProductsSelector } from './../../store/products.selector';
import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { IProduct } from './../../products.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})

export class ProductsPageComponent implements OnInit {
  public $products: Observable<IProduct[]>;

  constructor(private store: Store<AppState>) {
    this.$products = this.store.pipe(select(getProductsSelector))
  }

  ngOnInit() {

  }
}
