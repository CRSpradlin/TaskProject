import { createAction, props } from "@ngrx/store";
import { TaskEntity } from "../reducers/tasks.reducer";

export const loadTasks = createAction(
    '[app task] Loading task data'
);

export const clearTasks = createAction(
    '[app task] Clear task data'
);

export const tasksSuccessfullyLoaded = createAction(
    '[app task] Task data successfully loaded',
    props<{ payload: TaskEntity[] }>()
)