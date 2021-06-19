import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/task.actions';

export interface TaskEntity {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskState extends EntityState<TaskEntity> {

}

export const adapter = createEntityAdapter<TaskEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.tasksSuccessfullyLoaded, (s, a) => adapter.setAll(a.payload, s)),
  on(actions.clearTasks, () => initialState)
);

export function reducer(state: TaskState = initialState, action: Action): TaskState {
  return reducerFunction(state, action);
}







