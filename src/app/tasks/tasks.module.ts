import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { MomentModule } from 'angular2-moment';

import { ListService } from './task.service';
import { ListComponent } from './list';
import { CoreModule } from '../core';
import { TaskRowComponent, NewTaskRowComponent } from './task-row';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MomentModule,
  ],
  declarations: [
    ListComponent,
    TaskRowComponent,
    NewTaskRowComponent,
  ],
  providers: [
    ListService,
  ],
  exports: [
    ListComponent,
  ]
})
export class TasksModule { }
