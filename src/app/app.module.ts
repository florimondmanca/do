// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

// App
import { CoreModule } from './core';
import { TasksModule } from './tasks';
import { AppComponent } from './app.component';

// Third-party
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    CoreModule,
    TasksModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
