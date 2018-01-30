import { Action } from '@ngrx/store';

export const GET_USER = '[Auth] Get User';
export const AUTHENTICATED = '[Auth] User Authenticated';
export const NOT_AUTHENTICATED = '[Auth] User Not Authenticated';
export const ANONYMOUS_LOGIN = '[Auth] Anonymous Login attempt';
export const AUTH_ERROR = '[Auth] Error';

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
