import { loadTags, addTag, loadTagsSuccess, addTagSuccess, deleteTag, deleteTagSuccess } from './tags.actions';
import { ITag } from './../tags.model';
import { TagsService } from './../tags.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class TagsEffects {
  deleteTag$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTag),
    mergeMap(({ id }) => this.tagsService.delete(id)
      .pipe(
        map((deleted: ITag) => {
          return deleteTagSuccess({ deleted });
        })
      ))
  ));

  addTag$ = createEffect(() => this.actions$.pipe(
    ofType(addTag),
    mergeMap(({ item }) => this.tagsService.post(item)
      .pipe(
        map((created: ITag) => {
          return addTagSuccess({ created });
        })
      ))
  ));

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
