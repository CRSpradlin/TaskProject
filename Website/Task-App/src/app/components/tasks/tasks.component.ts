import { Component, OnInit } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTasks } from 'src/app/actions/task.actions';
import { TaskListModel } from 'src/app/models/taskModel';
import { AppState, selectTasks } from 'src/app/reducers';
import { TaskEntity } from 'src/app/reducers/tasks.reducer';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$?: Observable<TaskListModel[]>

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.tasks$ = this.store.select(selectTasks);
  }

}
