import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userLoggedIn, userLogInFormIncorrectlySubmitted, userLogInFormSubmitted } from 'src/app/actions/user.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(userLogInFormSubmitted(this.formGroup.value));
      this.formGroup.reset();
    } else {
      this.store.dispatch(userLogInFormIncorrectlySubmitted());
    }
  }

}
