import { ProductsService } from './../products.service';
import { IProduct } from './../products.model';
import { loadProducts, loadProductsSuccess } from './products.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() => this.productService.getAll().pipe(
      map((items: IProduct[]) => {
        debugger
        return loadProductsSuccess({ items });
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) { }
}
