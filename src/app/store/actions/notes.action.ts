import { Action } from '@ngrx/store';

import { Note } from '../../models/note.model';
import { User } from '../../models/user.model';

// Firestore Actions
export const ADDED = '[Note] added';
export const MODIFIED = '[Note] modified';
export const DELETE = '[Note] removed';

export const CREATE = '[Notes] Create Note';
export const CREATE_SUCCESS = '[Notes] Create Note Success';
export const CREATE_FAIL = '[Notes] Create Note Fail';
export const LOAD_NOTES = '[Notes] Loading User Notes';
export const LOAD_NOTES_SUCCESS = '[Notes] Load Notes Success';
export const LOAD_NOTES_FAIL = '[Notes] Load Notes Fail';
export const UPDATE = '[Notes] Update Note';
export const UPDATE_SUCCESS = '[Notes] Update Note Success';
export const UPDATE_FAIL = '[Notes] Update Note Fail';
export const REMOVE = '[Notes] Remove Note';
export const REMOVE_SUCCESS = '[Notes] Remove Note Success';
export const REMOVE_FAIL = '[Notes] Remove Note Fail';

export class Added implements Action {
  readonly type = ADDED;
  constructor(public payload: Note, public uid: string) {}
}

export class Modified implements Action {
  readonly type = MODIFIED;
  constructor(public payload: Note) {}
}

export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: Note) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: Note, public uid: string) {}
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: Note) {}
}

export class CreateFail implements Action {
  readonly type = CREATE_FAIL;
  constructor(public payload: any) {}
}

export class LoadNotes implements Action {
  readonly type = LOAD_NOTES;
  constructor(public payload: User) {}
}

export class LoadNotesSuccess implements Action {
  readonly type = LOAD_NOTES_SUCCESS;
  constructor(public payload: Note[]) {}
}

export class LoadNotesFail implements Action {
  readonly type = LOAD_NOTES_FAIL;
  constructor(public payload: any) {}
}

export class Update implements Action {
  readonly type = UPDATE;
  constructor(
    public id: string,
    public uid: string,
    public changes: Partial<Note>
  ) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor() {}
}

export class UpdateFail implements Action {
  readonly type = UPDATE_FAIL;
  constructor(public payload: any) {}
}

export class Remove implements Action {
  readonly type = REMOVE;
  constructor(public id: string, public uid: string) {}
}

export class RemoveSuccess implements Action {
  readonly type = REMOVE_SUCCESS;
  constructor() {}
}

export class RemoveFail implements Action {
  readonly type = REMOVE_FAIL;
  constructor(public payload: any) {}
}

export type NoteAction =
  | Added
  | Modified
  | Delete
  | Create
  | CreateSuccess
  | CreateFail
  | LoadNotes
  | LoadNotesSuccess
  | LoadNotesFail
  | Update
  | UpdateSuccess
  | UpdateFail
  | Remove
  | RemoveSuccess
  | RemoveFail;
