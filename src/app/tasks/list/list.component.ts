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
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.sub = this.listService.get(id).subscribe(
        list => this.list = list
      );
    }
  }

  constructor(private listService: ListService) { }

  ngOnInit() {
  }

  addTask() {
    // TODO POST to backend
    this.list.tasks.push(this.newTask);
    this.newTask = new Task();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
