import { EntityState, createEntityAdapter } from '@ngrx/entity';

import * as fromNotes from '../actions/notes.action';
import { Note } from '../../models/note.model';

// Entity adapter
export const notesAdapter = createEntityAdapter<Note>();
export interface NoteState extends EntityState<Note> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: NoteState = notesAdapter.getInitialState({
  loading: false,
  loaded: false
});

// Reducer
export function reducer(
  state = initialState,
  action: fromNotes.NoteAction
): NoteState {
  switch (action.type) {
    case fromNotes.ADDED:
      return notesAdapter.addOne(action.payload, state);
    case fromNotes.MODIFIED:
      return notesAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    case fromNotes.DELETE:
      return notesAdapter.removeOne(action.payload.id, state);
    case fromNotes.LOAD_NOTES:
      return { ...state, loading: true };
    case fromNotes.LOAD_NOTES_SUCCESS:
      return { ...state, loading: false, loaded: true };
    case fromNotes.LOAD_NOTES_FAIL:
      return { ...state, loading: false, loaded: false };
    default:
      return state;
  }
}
