import { Action } from '@ngrx/store';

import { Note } from '../../models/note.model';

export const CREATE = '[Notes] Create Note';
export const UPDATE = '[Notes] Update Note';
export const DELETE = '[Notes] Delete Note';

export class Create implements Action {
  readonly type = CREATE;
  constructor(public note: Note) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(public id: string, public changes: Partial<Note>) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public id: string) {}
}

export type NoteAction = Create | Update | Delete;
