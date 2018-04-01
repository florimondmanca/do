import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { ListService } from '../task.service';
import { TaskRowComponent } from './task-row.component';


@Component({
  selector: 'app-new-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss']
})
export class NewTaskRowComponent extends TaskRowComponent {

  @Input() listId: number;
  @Output() created: EventEmitter<Task> = new EventEmitter();
  placeholder = 'Add task…';
  deletable = false;

  ngOnInit() {
    super.ngOnInit();
    this.reset();
  }

  reset() {
    this.task = new Task();
  }

  private create() {
    this.clearSub();
    this.sub = this.listService.create(this.listId, this.task).subscribe(
      task => {
        this.created.emit(task);
        this.reset();
        super.clearSub();
      },
      error => {
        console.log(error);
        this.clearSub();
      }
    );
  }

  onComplete() {
    if (this.task.title) {
      this.task.completed = !this.task.completed;
      this.create();
    }
  }

  onSubmit() {
    if (this.task.title) {
      this.create();
    }
  }

  onFocusOut() {
    // Do nothing
  }

}
