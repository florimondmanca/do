import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';

import { Task, List, ListService } from './tasks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tasks: Task[];
  lists: List[] = [
    new List({
      id: 1,
      title: 'Shopping',
      tasks: [],
    }),
    new List({
      id: 2,
      title: 'Trips',
      tasks: [],
    }),
  ]
  activeListId: number;

  constructor(
    private listService: ListService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getLists();
    this.location.subscribe(
      (event: PopStateEvent) => this.activeListId = this.extractListId(event.url)
    );
    this.activeListId = this.extractListId(this.location.path());
  }

  extractListId(url: string) {
    const pattern = /^\/l\/(\w+)$/g;
    const res = pattern.exec(url);
    if (res) {
      const id = +res[1];
      return +res[1];
    } else {
      return null;
    }
  }

  getLists() {
    this.listService.list().subscribe(
      lists => this.lists = lists
    );
  }

  selectList(id: number) {
    if (this.activeListId !== id) {
      this.activeListId = id;
      this.location.go(`l/${id}`);
    }
  }
}
