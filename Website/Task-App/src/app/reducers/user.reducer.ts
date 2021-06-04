

import { Action, createReducer, on } from "@ngrx/store";
import * as actions from '../actions/user.actions';

export interface UserData {
  token: string;
  email: string;
}

export interface UserState {
  data: UserData,
  loggedIn: boolean;
}

const initialState: UserState = {
  data: {
    token: '',
    email: ''
  },
  loggedIn: false
}

const myReducer = createReducer(
  initialState,
  on(actions.userLoggedIn, (s, a) => ({ ...s, data: a.data, loggedIn: a.loggedIn })),
  on(actions.userLoggedOut, (s) => ({...s, ...initialState}))
//   on(actions.countDecremented, (s) => ({ ...s, current: s.current - s.by })),
//   on(actions.countBySet, (s, a) => ({ ...s, by: a.by })),
//   on(actions.countReset, (s) => ({ ...s, current: 0 }))
)

// CounterState Reducer(CounterState state, Action action) {}
export function reducer(state: UserState = initialState, action: Action): UserState {
  return myReducer(state, action);
}

