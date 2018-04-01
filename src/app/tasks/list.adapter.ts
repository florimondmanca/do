import { Injectable } from '@angular/core';
import { List } from './list.model';
import { TaskAdapter } from './task.adapter';

@Injectable()
export class ListAdapter {

  constructor(private taskAdapter: TaskAdapter) { }

  toRead(item: any): List {
    return new List({
      id: item.id,
      title: item.title,
      tasks: item.tasks ? item.tasks.map(taskItem => this.taskAdapter.toRead(taskItem)) : [],
    })
  }

  toCreate(list: List): any {
    return {
      title: list.title,
    };
  }
}
