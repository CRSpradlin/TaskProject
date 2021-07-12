import { Action, createReducer, on } from "@ngrx/store";
import * as taskActions from '../actions/task.actions';

export interface UiHintsState {
  tasksAreLoaded: boolean;
  // etc. etc. for other things too
}

const initialState: UiHintsState = {
  tasksAreLoaded: false
}

const myReducer = createReducer(
  initialState,
  on(taskActions.tasksSuccessfullyLoaded, s => ({ ...s, tasksAreLoaded: true })),
  on(taskActions.loadTasks, s => ({ ...s, tasksAreLoaded: false }))
)

export function reducer(state: UiHintsState = initialState, action: Action): UiHintsState {
  return myReducer(state, action);
}
