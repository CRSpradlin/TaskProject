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

export const userRegistrationFailed = createAction(
    '[app user] User Registration Failed'
);

export const userLogInFormSubmitted = createAction(
    '[app user] User Login Form Submitted',
    ({ email, password }: { email: string, password: string }) => ({
        payload: {
            email,
            password
        }
    })
);

export const userAuthenticationFormCallbackSuccessful = createAction(
    '[app user] User Authentication Callback Completed',
    ({ token, email }: { token: string, email: string }) => ({
        token,
        email
    })
);

export const userLogInFormIncorrectlySubmitted = createAction(
    '[app user] User Login Form Submitted with Incorrect Input'
);

export const userLoginFailed = createAction(
    '[app user] User Login Failed'
)

export const userLoggedIn = createAction(
    '[app user] User Logged In Successfully',
    ({ token, email }: { token: string, email: string }) => ({
        data: {
            token,
            email
        },
        loggedIn: true
    })
);

export const userLoggedOut = createAction(
    '[app user] User Logged Out'
)