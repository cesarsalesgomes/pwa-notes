import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

// Models
import { User } from '../../models/user.model';
import { Note } from '../../models/note.model';

// Rxjs
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';

// Actions
import * as fromNotes from '../actions/notes.action';

// Notes Service
import { NoteService } from '../../services/notes.service';

@Injectable()
export class NotesEffects {
  constructor(private actions$: Actions, private noteService: NoteService) {}

  // Load User Notes
  @Effect()
  loadNotes$: Observable<any> = this.actions$.ofType(fromNotes.LOAD_NOTES).pipe(
    map((action: fromNotes.LoadNotes) => action.payload),
    switchMap((user: User) => {
      return this.noteService.getNotes(user);
    }),
    mergeMap(actions => actions),
    map((action: any) => {
      return {
        type: `[Note] ${action.type}`,
        payload: {
          ...action.payload.doc.data(),
          id: action.payload.doc.id
        }
      };
    }),
    catchError(err =>
      Observable.of(new fromNotes.LoadNotesFail({ error: err.message }))
    )
  );

  // Insert Note in Database
  @Effect()
  createNote$ = this.actions$.ofType(fromNotes.CREATE).pipe(
    map((action: fromNotes.Create) => {
      return {
        note: action.payload,
        uid: action.uid
      };
    }),
    switchMap(({ note, uid }) => {
      return Observable.fromPromise(this.noteService.createNote(note, uid));
    }),
    map((note: Note) => new fromNotes.CreateSuccess(note)),
    catchError(err =>
      Observable.of(new fromNotes.CreateFail({ error: err.message }))
    )
  );

  // Update Note in Database
  @Effect()
  updateNote$ = this.actions$.ofType(fromNotes.UPDATE).pipe(
    map((action: fromNotes.Update) => action),
    switchMap(data => {
      return Observable.fromPromise(this.noteService.updateNote(data));
    }),
    map(() => new fromNotes.UpdateSuccess()),
    catchError(err =>
      Observable.of(new fromNotes.UpdateFail({ error: err.message }))
    )
  );

  // Remove Note in Database
  @Effect()
  removeNote$ = this.actions$.ofType(fromNotes.REMOVE).pipe(
    map((action: fromNotes.Remove) => action),
    switchMap(data => {
      return Observable.fromPromise(this.noteService.removeNote(data));
    }),
    map(() => new fromNotes.RemoveSuccess()),
    catchError(err =>
      Observable.of(new fromNotes.RemoveFail({ error: err.message }))
    )
  );
}
