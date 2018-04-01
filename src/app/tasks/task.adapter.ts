import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable()
export class TaskAdapter {
  toRead(item: any): Task {
    return new Task({
      id: item.id,
      listId: item.list_id,
      title: item.title,
      dueDate: item.due_date ? new Date(item.due_date) : null,
      completed: item.completed,
      priority: item.priority,
    });
  }

  toCreate(task: Task): any {
    return {
      title: task.title,
      list_id: task.listId,
      due_date: task.dueDate ? task.dueDate.toISOString() : null,
      completed: task.completed,
      priority: task.priority,
    };
  }

  toUpdate(task: Task): any {
    const data: any = this.toCreate(task);
    data.id = task.id;
    return data;
  }
}
