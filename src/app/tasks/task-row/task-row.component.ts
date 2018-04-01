import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { ListService } from '../task.service';
import { DiffService } from '@app/core';

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

  constructor(
    protected listService: ListService,
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

  private update() {
    this.clearSub();
    this.sub = this.listService.update(this.task).subscribe(
      resp => this.clearSub(),
      error => {
        console.log(error);
        this.clearSub();
      },
    );
  }

  onComplete() {
    this.task.completed = !this.task.completed;
    this.clearSub();
    this.sub = this.listService.updateCompleted(this.task).subscribe(
      resp => this.clearSub(),
      error => {
        console.log(error);
        // Revert
        this.task.completed = !this.task.completed;
        this.clearSub();
      }
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

  delete() {
    this.clearSub();
    this.sub = this.listService.delete(this.task.id).subscribe(
      () => {
        this.deleted.emit(this.task);
        this.clearSub();
      },
      (error) => {
        console.log(error);
        this.clearSub();
      }
    );
  }

}
