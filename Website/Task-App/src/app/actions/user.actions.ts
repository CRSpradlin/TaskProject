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
)