import { AppState } from './../../../contracts/store/reducers/index';
import { Store } from '@ngrx/store';
import { addTagQuestion, addTagQuestionSuccess, updateTagQuestion, updateTagQuestionSuccess } from './../actions/tag-question.action';
import { TagQuestionsService } from './../../services/tag-questions.service';
import { ITagQuestion } from './../../tags.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class TagQuestionsEffects {
  addTagQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(updateTagQuestion),
    mergeMap(({ item }) => this.tagsService.post(item)
      .pipe(
        map((updated: ITagQuestion) => {
          return updateTagQuestionSuccess({ updated });
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private tagsService: TagQuestionsService
  ) { }
}
