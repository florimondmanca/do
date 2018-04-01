import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';
import { Task } from './task.model';
import { List } from './list.model';
import { TASKS } from './task.mock';
import { TaskAdapter } from './task.adapter';


@Injectable()
export class TaskService {
  private baseUrl = 'http://localhost:8000/';
  private apiUrl = this.baseUrl + 'lists/';

  constructor(
    private http: HttpClient,
    private adapter: TaskAdapter,
  ) { }

  create(id: number, task: Task): Observable<Task> {
    const url = this.baseUrl + `tasks/`;
    task.listId = id;
    const data = this.adapter.toCreate(task);
    return this.http.post<Task>(url, data).pipe(
      map((item: any) => this.adapter.toRead(item)),
      tap(resp => console.log('created task')),
    );
  }

  update(task: Task) {
    const url = this.baseUrl + `tasks/${task.id}`;
    const data = this.adapter.toUpdate(task);
    return this.http.patch(url, data).pipe(
      tap(resp => console.log('updated task')),
    );
  }

  updateCompleted(task: Task): Observable<any> {
    const url = this.baseUrl + `tasks/${task.id}`;
    const data = { completed: task.completed };
    return this.http.patch(url, data).pipe(
      tap(resp => console.log('changed task completed status'))
    )
  }

  delete(taskId: number): Observable<any> {
    const url = this.baseUrl + `tasks/${taskId}`;
    return this.http.delete(url).pipe(
      tap(resp => console.log('deleted task'))
    );
  }
}
