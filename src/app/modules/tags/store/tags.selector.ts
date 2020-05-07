import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromTags from './tags.reducer'

export const selectedState = (state: AppState) => state.tags;
export const getProductsSelector = createSelector(
  selectedState,
  fromTags.getTags
);
