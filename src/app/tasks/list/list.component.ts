import {
  Component, OnInit, Input, OnDestroy, Output, EventEmitter,
  OnChanges, SimpleChanges, SimpleChange,
} from '@angular/core';
import { Task } from '../task.model';
import { List } from '../list.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  list: List;
  sub: any;
  Arr = Array;
  newTask: Task = new Task();

  @Output() deleted: EventEmitter<List> = new EventEmitter();
  @Output() found: EventEmitter<List> = new EventEmitter();
  @Output() notFound: EventEmitter<any> = new EventEmitter();

  @Input() set listId(id: number) {
    if (!(id == null || id == undefined)) {
      this.clearSub();
      this.sub = this.listService.get(id).subscribe(
        list => {
          this.list = list;
          this.found.emit(list);
          this.clearSub();
        },
        error => {
          this.notFound.emit();
          this.list = null;
          this.clearSub();
        }
      );
    } else {
      this.list = null;
    }
  }

  constructor(private listService: ListService) { }

  ngOnInit() { }

  clearSub() {
    if (this.sub) this.sub.unsubscribe();
    this.sub = null;
  }

  remove(task: Task) {
    // Find the task corresponding to the deleted task's id
    let index: number = -1;
    for (let i in this.list.tasks) {
      const ind = +i;
      if (this.list.tasks[ind].id == task.id) {
        index = ind;
        break;
      }
    }
    if (index >= 0) {
      this.list.tasks.splice(index, 1);
    }
  }

  delete() {
    this.clearSub();
    this.sub = this.listService.destroy(this.list).subscribe(
      () => {
        this.deleted.emit(this.list);
        this.clearSub();
      },
      (error) => {
        console.log(error);
        this.clearSub();
      }
    )
  }

  registerCreated(task: Task) {
    this.list.tasks.push(task);
  }

  ngOnDestroy() {
    this.clearSub();
  }

}
