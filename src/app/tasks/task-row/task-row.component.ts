import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { DiffService, BusyState } from '@app/core';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss']
})
export class TaskRowComponent implements OnInit, OnDestroy {

  @Input() task: Task;
  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  placeholder: string = '';
  deletable: boolean = true;
  sub: any;
  subState: BusyState;

  constructor(
    protected taskService: TaskService,
    private diffService: DiffService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.clearSub();
  }

  protected clearSub() {
    if (this.sub) this.sub.unsubscribe();
    this.sub = null;
  }

  onCallSuccess() {
    this.subState = BusyState.SUCCESS;
    this.clearSub();
  }

  onCallError(error: any) {
    console.log(error);
    this.subState = BusyState.ERROR;
    this.clearSub();
  }

  private update() {
    this.clearSub();
    this.diffService.set(this.task);
    this.sub = this.taskService.update(this.task).subscribe(
      resp => this.onCallSuccess(),
      this.onCallError
    );
  }

  toggleComplete() {
    this.task.completed = !this.task.completed;
    this.clearSub();
    this.sub = this.taskService.updateCompleted(this.task).subscribe(
      resp => this.onCallSuccess(),
      error => {
        // Revert
        this.task.completed = !this.task.completed;
        this.onCallError(error);
      }
    );
  }

  delete() {
    this.clearSub();
    this.sub = this.taskService.delete(this.task.id).subscribe(
      () => {
        this.deleted.emit(this.task);
        this.onCallSuccess();
      },
      this.onCallError
    );
  }

  onSubmit() { this.update(); }

  onFocus() {
    this.diffService.set(this.task);
  }

  _onFocusOut() {
    if (this.diffService.hasChanged(this.task)) {
      this.onFocusOut();
    }
    this.diffService.unset();
  }

  onFocusOut() {
    this.update();
  }

}
