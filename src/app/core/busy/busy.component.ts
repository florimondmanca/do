import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnInit {

  @Input() data: any[];

  constructor() { }

  ngOnInit() {
  }

}
