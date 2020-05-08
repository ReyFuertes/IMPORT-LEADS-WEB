import { addCategory, addCategorySuccess } from './../actions/category.action';
import { CategoryService } from './../../../../services/category.service';
import { AppState } from './../../../../store/app.reducer';
import { ICategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class CategoryEffects {
  addCategory$ = createEffect(() => this.actions$.pipe(
    ofType(addCategory),
    mergeMap(({ payload }) => this.categoryService.post(payload)
      .pipe(
        map((created: ICategory) => {
          return addCategorySuccess({ created });
        })
      ))
  ));

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) { }
}
