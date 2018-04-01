// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Third-party
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { BusyComponent, BusyDirective } from './busy';
import { TimesDirective } from './times.directive';
import { DiffService } from './diff.service';
import { BusyStateComponent } from './busy-state';

@NgModule({
  declarations: [
    BusyComponent,
    BusyDirective,
    TimesDirective,
    BusyStateComponent,
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
  ],
  providers: [
    DiffService,
  ],
  exports: [
    BusyDirective,
    TimesDirective,
    BusyStateComponent,
  ],
  entryComponents: [
    BusyComponent,
  ],
})
export class CoreModule { }
