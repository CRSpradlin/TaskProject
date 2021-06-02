import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as userStore from './user.reducer';

export interface AppState {
    user: userStore.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
    user: userStore.reducer
}

const selectUserBranch = (state: AppState) => state.user;

export const selectUserData = createSelector(
    selectUserBranch,
    b => b.data
)

export const selectUserLoggedInBoolean = createSelector(
    selectUserBranch,
    b => b.loggedIn
)
