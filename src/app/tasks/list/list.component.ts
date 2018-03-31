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
  listSub: any;
  addTaskSub: any;
  Arr = Array;
  newTask: Task = new Task();

  @Input() set listId(id: number) {
    if (id) {
      if (this.listSub) {
        this.listSub.unsubscribe();
      }
      this.listSub = this.listService.get(id).subscribe(
        list => this.list = list
      );
    }
  }

  constructor(private listService: ListService) { }

  ngOnInit() {
  }

  addTask() {
    this.addTaskSub = this.listService.addTask(this.list.id, this.newTask).subscribe(
      task => {
        this.list.tasks.push(task);
        this.newTask = new Task();
        this.addTaskSub.unsubscribe();
        this.addTaskSub = null;
      },
      error => console.log(error)
    );
  }

  updateTask(task: Task) {
    this.listService.updateTask(task).subscribe(
      task => console.log('task updated'),
      error => console.log(error)
    );
  }

  completeNewTask() {
    if (this.newTask.title) {
      this.newTask.completed = !this.newTask.completed;
      this.addTask();
    }
  }

  ngOnDestroy() {
    if (this.listSub) {
      this.listSub.unsubscribe();
    }
    if (this.addTaskSub) {
      this.addTaskSub.unsubscribe();
    }
  }

}
