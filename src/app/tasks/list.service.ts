import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';
import { Task } from './task.model';
import { List } from './list.model';
import { ListAdapter } from './list.adapter';


@Injectable()
export class ListService {
  private baseUrl = 'http://localhost:8000/';
  private apiUrl = this.baseUrl + 'lists/';

  constructor(
    private http: HttpClient,
    private adapter: ListAdapter,
  ) { }

  list(): Observable<List[]> {
    return this.http.get<List[]>(this.apiUrl).pipe(
      tap(resp => console.log('fetched lists')),
      map((items: any[]) => items.map(item => this.adapter.toRead(item))),
    );
  }

  get(id: number): Observable<List> {
    const url = this.apiUrl + id;
    return this.http.get<List>(url).pipe(
      map((item: any) => this.adapter.toRead(item)),
      tap(resp => console.log('fetched list'))
    );
  }

  create(list: List): Observable<List> {
    const url = this.apiUrl;
    const data = this.adapter.toCreate(list);
    return this.http.post<List>(url, data).pipe(
      map((item: any) => this.adapter.toRead(item)),
      tap(resp => console.log('created list')),
    )
  }

  destroy(list: List): Observable<any> {
    const url = this.apiUrl + list.id;
    return this.http.delete(url).pipe(
      tap(resp => console.log('destroyed list')),
    );
  }

}
