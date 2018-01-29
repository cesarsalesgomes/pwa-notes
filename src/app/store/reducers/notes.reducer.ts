import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import * as actions from '../actions/notes.action';
import { Note } from '../../models/note.model';

// Entity adapter
export const notesAdapter = createEntityAdapter<Note>();
export interface NoteState extends EntityState<Note> {}

// Initial State
const defaultNote = {
  ids: ['1'],
  entities: {
    '1': {
      id: '1',
      message: '...'
    }
  }
};

export const initialState: NoteState = notesAdapter.getInitialState(defaultNote);

// Reducer
export function reducer(
  state: NoteState = initialState,
  action: actions.NotesActions
) {
  switch (action.type) {
    case actions.CREATE:
      return notesAdapter.addOne(action.note, state);
    case actions.UPDATE:
      return notesAdapter.updateOne(
        {
          id: action.id,
          changes: action.changes
        },
        state
      );
    case actions.DELETE:
      return notesAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}
