import { createAction } from "@ngrx/store";

export const userRegistrationSubmitted = createAction(
    '[app user] User Registration Submitted',
    ({ email, password }: { email: string, password: string }) => ({
        payload: {
          email,
          password,
        }
    })
);

export const userRegistrationFormIncorrectlySubmitted = createAction(
    '[app user] User Registration Form Submitted with Incorrect Input' 
);

export const userRegistrationCompleted = createAction(
    '[app user] User Registration Completed',
    ({ token, email }: { token: string, email: string }) => ({
        token,
        email
    })
);

export const userRegistrationFailed = createAction(
    '[app user] UserRegistration Failed'
);

export const userLoggedIn = createAction(
    '[app user] User Logged In Successfully',
    ({ token, email }: { token: string, email: string }) => ({
        data: {
            token,
            email
        },
        loggedIn: true
    })
)