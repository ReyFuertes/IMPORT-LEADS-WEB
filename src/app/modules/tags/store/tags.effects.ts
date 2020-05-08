import { loadTags, loadTagsSuccess } from './tags.actions';
import { ITag } from './../tags.model';
import { TagsService } from './../tags.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class TagsEffects {
  loadTags$ = createEffect(() => this.actions$.pipe(
    ofType(loadTags),
    mergeMap(() => this.tagsService.getAll().pipe(
      map((items: ITag[]) => {
        return loadTagsSuccess({ items });
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private tagsService: TagsService
  ) { }
}
