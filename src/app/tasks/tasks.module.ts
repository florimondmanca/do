import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MomentModule } from 'angular2-moment';

import { TaskAdapter } from './task.adapter';
import { ListAdapter } from './list.adapter';
import { TaskService } from './task.service';
import { ListService } from './list.service';
import { ListComponent } from './list';
import { CoreModule } from '../core';
import { TaskRowComponent, NewTaskRowComponent } from './task-row';
import { AddListPopupComponent } from './add-list-popup';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MomentModule,
    AngularFontAwesomeModule,
  ],
  declarations: [
    ListComponent,
    TaskRowComponent,
    NewTaskRowComponent,
    AddListPopupComponent,
  ],
  providers: [
    TaskService,
    ListService,
    TaskAdapter,
    ListAdapter,
  ],
  exports: [
    ListComponent,
    AddListPopupComponent,
  ]
})
export class TasksModule { }
