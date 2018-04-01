import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Task } from '../task.model';
import { TaskRowComponent } from './task-row.component';


@Component({
  selector: 'app-new-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss']
})
export class NewTaskRowComponent extends TaskRowComponent {

  @Input() listId: number;
  @Output() created: EventEmitter<Task> = new EventEmitter();
  @ViewChild('input') input: ElementRef;
  placeholder = 'Add task…';
  deletable = false;

  ngOnInit() {
    this.input.nativeElement.focus();
    super.ngOnInit();
    this.reset();
  }

  reset() {
    this.task = new Task();
  }

  private create() {
    this.clearSub();
    this.sub = this.taskService.create(this.listId, this.task).subscribe(
      task => {
        this.created.emit(task);
        this.reset();
        this.onCallSuccess();
      },
      this.onCallError
    );
  }

  toggleComplete() {
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
