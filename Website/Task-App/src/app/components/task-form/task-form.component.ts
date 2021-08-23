import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTaskFormSubmitted } from 'src/app/actions/task.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', []],
      description: ['', []]
    });
  }

  get f(){
    return this.formGroup.controls;
  }

  submit(): void {
    this.store.dispatch(addTaskFormSubmitted(this.formGroup.value));
    // this.formGroup.reset();
  }

}
