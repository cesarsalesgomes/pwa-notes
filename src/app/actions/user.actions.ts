import { Action } from '@ngrx/store';

export const GET_USER = '[AUTH] Get User';
export const AUTHENTICATED = '[AUTH] Authenticated';
export const NOT_AUTHENTICATED = '[AUTH] Not Authenticated';
export const ANONYMOUS_LOGIN = '[AUTH] Anonymous Login attempt';
export const AUTH_ERROR = '[AUTH] Error';

// Get User AuthState
export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload?: any) { }
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload?: any) { }
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor(public payload?: any) { }
}

export class AnonymousLogin implements Action {
  readonly type = ANONYMOUS_LOGIN;
  constructor(public payload?: any) { }
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) { }
}

export type All
  = GetUser
  | Authenticated
  | NotAuthenticated
  | AnonymousLogin
  | AuthError;
