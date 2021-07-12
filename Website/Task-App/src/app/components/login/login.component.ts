import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userLoggedIn, userLogInFormIncorrectlySubmitted, userLogInFormSubmitted } from 'src/app/actions/user.actions';
import { AppState, selectUserLoggedInBoolean } from 'src/app/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  loggedIn$?: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(selectUserLoggedInBoolean);
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.loggedIn$.subscribe(loggedIn => {
      if(loggedIn){
        this.router.navigate(['/home']);
      }
    })
  }

  get f(){
    return this.formGroup.controls;
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
