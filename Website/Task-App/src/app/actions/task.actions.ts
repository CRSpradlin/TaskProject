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
);

let id = 1;
export const addTaskFormSubmitted = createAction(
    '[app task] Task Form Submitted',
    ({ title, description }: { title: string, description: string }) => ({
        payload: {
          id: 'temp ' + id++,
          title,
          description,
          completed: false
        }
    })
);

export const taskSuccessfullyAdded = createAction(
    '[app task] Task Added Successfully',
    ({ data, oldId }: { data: TaskEntity, oldId: string }) => ({
        task: data,
        oldId
    })
);

export const taskAddFailure = createAction(
    '[app task] Task Addition Failed'
);

export const removeTask = createAction(
    '[app task] Remove Task',
    ({ task }: { task: TaskEntity }) => ({
        id: task.id
    })
)