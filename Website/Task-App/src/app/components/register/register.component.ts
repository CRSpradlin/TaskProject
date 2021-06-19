import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userRegistrationFormIncorrectlySubmitted, userRegistrationSubmitted } from 'src/app/actions/user.actions';
import { AppState, selectUserLoggedInBoolean } from 'src/app/reducers';
import { EqualityValidator } from 'src/app/validators/equality.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;
  loggedIn$?: Observable<boolean>;

  constructor(private formBuilder:FormBuilder, private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(selectUserLoggedInBoolean);
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      retypePassword: ['', [Validators.required]]
    }, { 
      validator: EqualityValidator('password', 'retypePassword')
    });

    this.loggedIn$.subscribe(loggedIn => {
      if(loggedIn){
        this.router.navigate(['/home']);
      }
    });
  }

  get f(){
    return this.formGroup.controls;
  }

  submit(): void {
    if (this.formGroup.valid){
      //dispatch to send credentials to API
      this.store.dispatch(userRegistrationSubmitted(this.formGroup.value));
      this.formGroup.reset();
    } else {
      this.store.dispatch(userRegistrationFormIncorrectlySubmitted());
    }
  }

}
