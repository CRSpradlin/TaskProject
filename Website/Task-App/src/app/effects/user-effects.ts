import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";
import { catchError, filter, map, switchMap, tap } from "rxjs/operators";

import { environment } from '../../environments/environment';
import * as userActions from "../actions/user.actions";
import * as appActions from "../actions/app.actions"

interface userResponseModel {
    token: string,
    email: string
}

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private client: HttpClient, private cookieService: CookieService) { }

    registerUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userActions.userRegistrationSubmitted),
            switchMap(a => this.client.post<userResponseModel>('/api/register/', {
                email: a.payload.email,
                password: a.payload.password
            })
                .pipe(
                    map(res => userActions.userRegistrationCompleted({ token: res.token, email: a.payload.email })),
                    catchError(err => of(userActions.userRegistrationFailed()))
                )
            )
        ), { dispatch: true }
    )

    loginUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userActions.userRegistrationCompleted),
            tap(a => this.cookieService.set('token', a.token)),
            tap(a => this.cookieService.set('email', a.email)),
            map(a => userActions.userLoggedIn({ token: a.token, email: a.email }))
        ), { dispatch: true }
    )

    checkCookies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.applicationStarted),
            map(() => {}),
            filter(() => this.cookieService.check('token') === true),
            map(() => userActions.userLoggedIn({token: this.cookieService.get('token'), email: this.cookieService.get('email')}))
        ), { dispatch: true }
    )
}