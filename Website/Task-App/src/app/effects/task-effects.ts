import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { map, switchMap, tap } from "rxjs/operators";

import * as taskActions from "../actions/task.actions";
import { AppState, selectUserData } from "../reducers";
import { TaskEntity } from "../reducers/tasks.reducer";

@Injectable()
export class TaskEffects {

    constructor(private cookieService: CookieService, private actions$: Actions, private client: HttpClient) { }

    loadTasks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(taskActions.loadTasks),
            switchMap(() => this.client.get<GetTasksResponse>('/api/task', {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('token'))})
                .pipe(
                    map(response => response.data),
                    map(data => taskActions.tasksSuccessfullyLoaded({ payload: data }))
                )
            )
        ), { dispatch: true }
    )
}

interface GetTasksResponse {
    data: TaskEntity[]
}