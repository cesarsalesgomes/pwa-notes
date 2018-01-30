import * as fromUser from '../actions/user.action';
import { User } from '../../models/user.model';

// Entity adapter
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
  state = initialState,
  action: fromUser.UserAction
): UserState {
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
    default:
      return state;
  }
}

export const getUserId = (state: UserState) => state.uid;
