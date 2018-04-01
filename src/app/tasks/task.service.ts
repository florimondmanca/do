import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';
import { Task, List } from './task.model';
import { TASKS } from './task.mock';


@Injectable()
export class ListService {
  private baseUrl = 'http://localhost:8000/';
  private apiUrl = this.baseUrl + 'lists/';

  constructor(private http: HttpClient) { }

  // Adapters

  adapt(item: any): List {
    return new List({
      id: item.id,
      title: item.title,
      tasks: item.tasks ? item.tasks.map(taskItem => this.adaptTaskIn(taskItem)) : [],
    })
  }

  adaptTaskIn(item: any): Task {
    return new Task({
      id: item.id,
      listId: item.list_id,
      title: item.title,
      dueDate: item.due_date ? new Date(item.due_date) : null,
      completed: item.completed,
      priority: item.priority,
    });
  }

  adaptTaskCreate(task: Task): any {
    return {
      title: task.title,
      list_id: task.listId,
      due_date: task.dueDate ? task.dueDate.toISOString() : null,
      completed: task.completed,
      priority: task.priority,
    };
  }

  adaptTaskUpdate(task: Task): any {
    const data: any = this.adaptTaskCreate(task);
    data.id = task.id;
    return data;
  }

  // Actions

  list(): Observable<List[]> {
    return this.http.get<List[]>(this.apiUrl).pipe(
      tap(resp => console.log('fetched lists')),
      map((items: any[]) => items.map(item => this.adapt(item))),
    );
  }

  get(id: number): Observable<List> {
    const url = this.apiUrl + id;
    return this.http.get<List>(url).pipe(
      map((item: any) => this.adapt(item)),
      tap(resp => console.log('fetched list'))
    );
  }

  create(id: number, task: Task): Observable<Task> {
    const url = this.baseUrl + `tasks/`;
    task.listId = id;
    const data = this.adaptTaskCreate(task);
    return this.http.post<Task>(url, data).pipe(
      map((item: any) => this.adaptTaskIn(item)),
      tap(resp => console.log('created task')),
    );
  }

  update(task: Task) {
    const url = this.baseUrl + `tasks/${task.id}`;
    const data = this.adaptTaskUpdate(task);
    return this.http.patch(url, data).pipe(
      tap(resp => console.log('updated task')),
    );
  }

  updateCompleted(task: Task) {
    const url = this.baseUrl + `tasks/${task.id}`;
    const data = { completed: task.completed };
    return this.http.patch(url, data).pipe(
      tap(resp => console.log('changed task completed status'))
    )
  }
}
