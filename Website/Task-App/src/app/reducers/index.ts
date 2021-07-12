import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as userStore from './user.reducer';
import * as taskStore from './tasks.reducer';
import * as uiHintsStore from './uiHints.reducer';
import { TaskListModel } from '../models/taskModel';

export interface AppState {
    user: userStore.UserState;
    tasks: taskStore.TaskState;
    uiHints: uiHintsStore.UiHintsState;
}

export const reducers: ActionReducerMap<AppState> = {
    user: userStore.reducer,
    tasks: taskStore.reducer,
    uiHints: uiHintsStore.reducer
}

const selectUserBranch = (state: AppState) => state.user;
const selectTasksBranch = (state: AppState) => state.tasks;
const selectUiHintsBranch = (state: AppState) => state.uiHints;

export const selectUserData = createSelector(
    selectUserBranch,
    b => b.data
)

export const selectUserLoggedInBoolean = createSelector(
    selectUserBranch,
    b => b.loggedIn
)

export const selectUiHints = createSelector(
    selectUiHintsBranch,
    b => b
)

const selectTaskEntityArray = taskStore.adapter.getSelectors(selectTasksBranch).selectAll;
export const selectTasks = createSelector(
    selectTaskEntityArray,
    tasks => tasks.map(task => {
      return {
        ...task,
        isSaved: !task.id.toString().startsWith('T')
      } as TaskListModel;
    })
)
