import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { List } from '../list.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-add-list-popup',
  templateUrl: './add-list-popup.component.html',
  styleUrls: ['./add-list-popup.component.scss']
})
export class AddListPopupComponent implements OnInit, OnDestroy {

  list: List = new List();
  @Output() added: EventEmitter<List> = new EventEmitter();
  sub: any;
  @ViewChild('title') input: ElementRef;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.input.nativeElement.focus();
  }

  clearSub() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  onSubmit() {
    this.listService.create(this.list).subscribe(
      list => {
        this.added.emit(list);
        this.list = new List();
        this.clearSub();
      },
      error => {
        console.log(error);
        this.clearSub();
      }
    )
  }

  ngOnDestroy() {
    this.clearSub();
  }

}
