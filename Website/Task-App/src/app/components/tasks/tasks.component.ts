import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { EntityState } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTasks } from 'src/app/actions/task.actions';
import { TaskListModel } from 'src/app/models/taskModel';
import { AppState, selectTasks } from 'src/app/reducers';
import { TaskEntity } from 'src/app/reducers/tasks.reducer';

import {CdkDrag, CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$?: Observable<TaskListModel[]>
  tasks: TaskListModel[] = new Array<TaskListModel>()
  closeResult = ''

  constructor(private store: Store<AppState>, private modalService: NgbModal) { }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-task-change-options', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  close(event: CdkDragDrop<TaskListModel>) {
    this.modalService.dismissAll()
    console.log(event.container)
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks())
    this.tasks$ = this.store.select(selectTasks)
    this.tasks$.subscribe(tasks => {
      this.tasks = tasks
    })
  }

  drop(event: CdkDragDrop<TaskListModel>) {
    //moveItemInArray(this.tasks, event.previousIndex, event.currentIndex)
    console.log(event.container)
  }

  test(data: TaskListModel): void {
    console.log(data);
  }
}
