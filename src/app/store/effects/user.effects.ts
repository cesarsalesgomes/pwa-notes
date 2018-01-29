import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { User } from '../../models/user.model';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';


import * as userActions from '../actions/user.action';
export type Action = userActions.All;

@Injectable()
export class UserEffects {

  constructor(private actions: Actions, private afAuth: AngularFireAuth) { }

  // Get User from Firebase
  @Effect()
  getUser: Observable<Action> = this.actions.ofType(userActions.GET_USER)
    .map((action: userActions.GetUser) => action.payload)
    .switchMap(payload => this.afAuth.authState)
    .map(authData => {
      if (authData) {
        const user = new User(authData.uid);
        return new userActions.Authenticated(user);
      } else {
        return new userActions.NotAuthenticated();
      }
    })
    .catch(err => Observable.of(new userActions.AuthError()));

  // Login with Anonymous Login if not authenticated
  @Effect()
  login: Observable<Action> = this.actions.ofType(userActions.NOT_AUTHENTICATED)
    .map((action: userActions.AnonymousLogin) => action.payload)
    .switchMap(payload => {
      return Observable.fromPromise(this.anonymousLogin());
    })
    .map(credential => {
      // Successful login
      return new userActions.GetUser();
    })
    .catch(err => {
      return Observable.of(new userActions.AuthError({ error: err.message }));
    });

  private anonymousLogin() {
    return this.afAuth.auth.signInAnonymously();
  }
}