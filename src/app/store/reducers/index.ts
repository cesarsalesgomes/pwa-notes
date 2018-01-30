import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromNotes from './notes.reducer';
import * as fromUser from './user.reducer';

export interface State {
  notes: fromNotes.NoteState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<State> = {
  notes: fromNotes.reducer,
  user: fromUser.reducer
};

// Notes Selectors
export const getNotesState = createFeatureSelector<fromNotes.NoteState>(
  'notes'
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = fromNotes.notesAdapter.getSelectors(getNotesState);

// User Selectors
export const getUserState = createFeatureSelector<fromUser.UserState>('user');

export const selectUserId = createSelector(getUserState, fromUser.getUserId);
