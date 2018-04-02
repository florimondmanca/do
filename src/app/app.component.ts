import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';

import { Task, List, ListService } from './tasks';


function findParent(element, id, rec?: boolean) {
  if (element.id === id) return true;
  if (element.parentNode) return findParent(element.parentNode, id, true);
  return false;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tasks: Task[];
  lists: List[];
  activeListId: number;
  popupVisible: boolean = false;

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
    document.body.addEventListener('click', (event) => {
      // If click anywhere but on the list popup, hide it
      // If clicked on the list popup, we should find the #add-list-popup
      // element in the event's element parents.
      if (!findParent(event.srcElement, 'add-list-popup')) {
        this.popupVisible = false;
      }
    }, true);
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
    }
  }

  home() {
    this.selectList(null);
    this.location.go('');
  }

  addList() {
    this.popupVisible = true;
  }

  onListAdded(list: List) {
    this.lists.push(list);
    this.popupVisible = false;
    this.selectList(list.id);
  }

  onListDeleted(list: List) {
    // Find the list corresponding to the deleted list's id
    let index: number = -1;
    for (let i in this.lists) {
      const ind = +i;
      if (this.lists[ind].id == list.id) {
        index = ind;
        break;
      }
    }
    if (index >= 0) {
      this.lists.splice(index, 1);
    }
    if (this.activeListId == list.id) {
      this.home();
    }
  }

  onListFound(list: List) {
    this.location.go(`l/${list.id}`);
  }

  onListNotFound() {
    this.selectList(null);
  }
}
