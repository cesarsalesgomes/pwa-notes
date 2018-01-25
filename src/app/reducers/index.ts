import { ActionReducerMap } from '@ngrx/store';
import { notesReducer } from '../notes/notes.reducer';

export const reducers: ActionReducerMap<any> = {
  notes: notesReducer
}