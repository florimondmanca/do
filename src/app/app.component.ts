import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

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

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.listService.list().subscribe(
      lists => this.lists = lists
    );
  }
}
