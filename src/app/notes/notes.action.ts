import { Action } from '@ngrx/store';
import { Note } from './notes.reducer';

export const CREATE = '[Notes] Create';
export const UPDATE = '[Notes] Update';
export const DELETE = '[Notes] Delete';

export class Create implements Action {
  readonly type = CREATE;
  constructor(public note: Note) { }
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public id: string, public changes: Partial<Note>) { }
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) { }
}

export type NotesActions
  = Create
  | Update
  | Delete;
