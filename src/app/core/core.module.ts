// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Third-party
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { BusyComponent, BusyDirective } from './busy';
import { TimesDirective } from './times.directive';
import { DiffService } from './diff.service';

@NgModule({
  declarations: [
    BusyComponent,
    BusyDirective,
    TimesDirective,
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
  ],
  entryComponents: [
    BusyComponent,
  ],
})
export class CoreModule { }
