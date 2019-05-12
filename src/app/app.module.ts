import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDateAdapter, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NgbDateMomentAdapter } from './ngb-date-moment-adapter';
import { Server } from './mock-server.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    NgbDatepickerModule,
    NgbTimepickerModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter },

    Server
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
