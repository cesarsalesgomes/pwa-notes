import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromNotes from './notes.reducer';

export interface State {
  notes: fromNotes.NoteState;
}

export const reducers: ActionReducerMap<State> = { notes: fromNotes.reducer };

// Notes Selectors
export const getNotesState = createFeatureSelector<fromNotes.NoteState>('notes');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = fromNotes.notesAdapter.getSelectors(getNotesState);
