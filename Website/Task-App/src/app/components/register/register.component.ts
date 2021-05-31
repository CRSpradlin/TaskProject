import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userRegistrationFormIncorrectlySubmitted, userRegistrationSubmitted } from 'src/app/actions/user.actions';
import { AppState } from 'src/app/reducers';
import { EqualityValidator } from 'src/app/validators/equality.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder:FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      retypePassword: ['', [Validators.required]]
    }, { 
      validator: EqualityValidator('password', 'retypePassword')
    });
  }

  get f(){
    return this.formGroup.controls;
  }

  submit(): void {
    if (this.formGroup.valid){
      //dispatch to send credentials to API
      this.store.dispatch(userRegistrationSubmitted(this.formGroup.value));
    } else {
      this.store.dispatch(userRegistrationFormIncorrectlySubmitted())
    }
  }

}
