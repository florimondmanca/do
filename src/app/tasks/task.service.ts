import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';
import { Task, List } from './task.model';
import { TASKS } from './task.mock';


@Injectable()
export class ListService {
  private apiUrl = 'http://localhost:8000/lists/';

  constructor(private http: HttpClient) { }

  adapt(item: any): List {
    return new List({
      id: item.id,
      title: item.title,
      tasks: item.tasks ? item.tasks.map(task => new Task({
        id: task.id,
        title: task.title,
        dueDate: task.due_date ? new Date(task.due_date) : null,
        completed: task.completed,
        priority: task.priority,
      })) : [],
    })
  }

  list(): Observable<List[]> {
    return this.http.get<List[]>(this.apiUrl).pipe(
      map((items: any[]) => items.map(item => this.adapt(item)))
    );
  }

  get(id: number): Observable<List> {
    const url = this.apiUrl + id;
    return this.http.get<List>(url).pipe(
      map((item: any) => this.adapt(item))
    );
  }
}
