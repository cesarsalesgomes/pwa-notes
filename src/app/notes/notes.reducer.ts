import * as actions from './notes.action';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Notes interface
export interface Note {
  id: string;
  message: string;
}

// Entity adapter
export const notesAdapter = createEntityAdapter<Note>();
export interface State extends EntityState<Note> { }

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

export const initialState: State = notesAdapter.getInitialState(defaultNote);

// Reducer
export function notesReducer(state: State = initialState, action: actions.NotesActions) {
  switch (action.type) {
    case actions.CREATE:
      return notesAdapter.addOne(action.note, state);
    case actions.UPDATE:
      return notesAdapter.updateOne({
        id: action.id,
        changes: action.changes,
      }, state);
    case actions.DELETE:
      return notesAdapter.removeOne(action.id, state);
    default:
      return state;
  }
}

// Create the default selectors
export const getNotesState = createFeatureSelector<State>('notes');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = notesAdapter.getSelectors(getNotesState);
