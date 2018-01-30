import * as fromUser from '../actions/user.action';
import { User } from '../../models/user.model';

export interface UserState {
  uid: string;
  loading: boolean;
}

export const initialState: UserState = {
  uid: null,
  loading: false
};

// Reducer Function
export function reducer(
  state: UserState = initialState,
  action: fromUser.UserAction
) {
  switch (action.type) {
    case fromUser.GET_USER:
      return { ...state, loading: true };
    case fromUser.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };
    case fromUser.NOT_AUTHENTICATED:
      return { ...state, ...initialState };
    case fromUser.ANONYMOUS_LOGIN:
      return { ...state, loading: true };
    case fromUser.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false };
  }
}
