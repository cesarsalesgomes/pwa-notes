import { Action } from '@ngrx/store';

export const GET_USER = '[AUTH] Get User';
export const AUTHENTICATED = '[AUTH] User Authenticated';
export const NOT_AUTHENTICATED = '[AUTH] User Not Authenticated';
export const ANONYMOUS_LOGIN = '[AUTH] Anonymous Login attempt';
export const AUTH_ERROR = '[AUTH] Error';

import { User } from '../../models/user.model';

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor() {}
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload: User) {}
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor() {}
}

export class AnonymousLogin implements Action {
  readonly type = ANONYMOUS_LOGIN;
  constructor() {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) {}
}

export type UserAction =
  | GetUser
  | Authenticated
  | NotAuthenticated
  | AnonymousLogin
  | AuthError;
