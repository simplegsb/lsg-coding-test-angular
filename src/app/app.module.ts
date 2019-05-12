import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDateAdapter, NgbDatepickerModule, NgbModalModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NgbDateMomentAdapter } from './ngb-date-moment-adapter';
import { Server } from './mock-server.service';
import { CreateRestaurantModalComponent } from './create-restaurant-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateRestaurantModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    NgbDatepickerModule,
    NgbModalModule,
    NgbTimepickerModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter },

    Server
  ],
  entryComponents: [
    CreateRestaurantModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
