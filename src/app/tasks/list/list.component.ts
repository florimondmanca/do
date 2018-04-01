import {
  Component, OnInit, Input, OnDestroy,
  OnChanges, SimpleChanges, SimpleChange,
} from '@angular/core';
import { List, Task } from '../task.model';
import { ListService } from '../task.service';

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

  @Input() set listId(id: number) {
    if (id) {
      this.clearSub();
      this.sub = this.listService.get(id).subscribe(
        list => {
          this.list = list;
          this.clearSub();
        },
        error => {
          console.log(error);
          this.clearSub();
        }
      );
    } else {
      this.list = null;
    }
  }

  constructor(private listService: ListService) { }

  clearSub() {
    if (this.sub) this.sub.unsubscribe();
    this.sub = null;
  }

  onDelete(task: Task) {
    const index = this.list.tasks.indexOf(task);
    this.list.tasks.splice(index, 1);
  }

  ngOnInit() {
  }

  registerCreated(task: Task) {
    this.list.tasks.push(task);
  }

  ngOnDestroy() {
    this.clearSub();
  }

}
