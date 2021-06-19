import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as userStore from './user.reducer';
import * as taskStore from './tasks.reducer';

export interface AppState {
    user: userStore.UserState;
    tasks: taskStore.TaskState;
}

export const reducers: ActionReducerMap<AppState> = {
    user: userStore.reducer,
    tasks: taskStore.reducer
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
