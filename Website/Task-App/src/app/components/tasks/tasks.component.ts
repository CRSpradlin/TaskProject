import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTasks, removeTask } from 'src/app/actions/task.actions';
import { TaskListModel } from 'src/app/models/taskModel';
import { AppState, selectTasks } from 'src/app/reducers';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$?: Observable<TaskListModel[]>
  tasks: TaskListModel[] = new Array<TaskListModel>()
  modalAction?: {
    task: TaskListModel
    type: string
  } 

  constructor(private store: Store<AppState>, private modalService: NgbModal) { }

  openModal(content: TemplateRef<any>, modalOptions: any = {ariaLabelledBy: 'modal-task-change-options', size: 'xl', centered: true}) {
    this.modalService.open(content, modalOptions);
  }

  closeTaskModal(event: CdkDragDrop<TaskListModel>, confirmModalContent: TemplateRef<any>) {
    this.modalService.dismissAll();
    this.modalAction = {
      task: event.item.data,
      type: event.container.id
    }
    console.log(this.modalAction);
    if (event.container.id == 'delete' || event.container.id == 'complete' || event.container.id == 'uncomplete') {
      this.modalService.open(confirmModalContent, { centered: true })
    }
  }
  
  processConfirmModalAction() {
    switch(this.modalAction?.type) {
      case 'delete':
        this.store.dispatch(removeTask({task: this.modalAction?.task}));
        break;
    }
    this.modalService.dismissAll();
  }

  closeConfirmModal() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks())
    this.tasks$ = this.store.select(selectTasks)
    this.tasks$.subscribe(tasks => {
      this.tasks = tasks
    })
  }
}
