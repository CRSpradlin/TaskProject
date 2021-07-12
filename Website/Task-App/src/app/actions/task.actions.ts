import { createAction, props } from "@ngrx/store";
import { TaskEntity } from "../reducers/tasks.reducer";

export const loadTasks = createAction(
    '[app task] Loading Task Data'
);

export const clearTasks = createAction(
    '[app task] Clear Task Data'
);

export const tasksSuccessfullyLoaded = createAction(
    '[app task] Task Data Successfully Loaded',
    props<{ payload: TaskEntity[] }>()
)