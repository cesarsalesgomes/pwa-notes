import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

// Models
import { User } from '../../models/user.model';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

// Rxjs
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';

// Actions
import * as fromUser from '../actions/user.action';
import * as fromNotes from '../actions/notes.action';


@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private afAuth: AngularFireAuth) {}

  // Check if user is logged
  @Effect()
  getUser$: Observable<fromUser.UserAction> = this.actions$
    .ofType(fromUser.GET_USER)
    .pipe(
      switchMap(() => {
        return this.afAuth.authState;
      }),
      map(authData => {
        if (authData) {
          const user: User = {
            uid: authData.uid
          };
          return new fromUser.Authenticated(user);
        } else {
          return new fromUser.NotAuthenticated();
        }
      }),
      catchError(err => Observable.of(new fromUser.AuthError()))
    );

  // Anonymous Login if not authenticated
  @Effect()
  anonymousLogin$: Observable<fromUser.UserAction> = this.actions$
    .ofType(fromUser.ANONYMOUS_LOGIN)
    .pipe(
      switchMap(() => {
        return Observable.fromPromise(this.afAuth.auth.signInAnonymously());
      }),
      map(credential => {
        // Successful login
        const user: User = { uid: credential.uid };
        return new fromUser.Authenticated(user);
      }),
      catchError(err =>
        Observable.of(new fromUser.AuthError({ error: err.message }))
      )
    );

  // If not authenticated, attempt anonymous login
  @Effect()
  notAuthenticated$: Observable<fromUser.UserAction> = this.actions$
    .ofType(fromUser.NOT_AUTHENTICATED)
    .pipe(
      map(() => {
        return new fromUser.AnonymousLogin();
      })
    );

  // If authenticated, load user notes
  @Effect()
  authenticated$: Observable<fromNotes.NoteAction> = this.actions$
    .ofType(fromUser.AUTHENTICATED)
    .pipe(
      map((action: fromUser.Authenticated) => action.payload),
      map((user: User) => new fromNotes.LoadNotes(user))
    );
}
