import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDateAdapter, NgbDatepickerModule, NgbModalModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NgbDateMomentAdapter } from './ngb-date-moment-adapter';
import { ServerService } from './mock-server.service';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
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

        ServerService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display opening hours text correctly', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const openingHoursText = fixture.componentInstance.getOpeningHoursText([
      { dayOfTheWeek: 1, openingTime: { hour: 11, minute: 0 }, closingTime: { hour: 23, minute: 0 } },
      { dayOfTheWeek: 2, openingTime: { hour: 11, minute: 0 }, closingTime: { hour: 23, minute: 0 } },
      { dayOfTheWeek: 3, openingTime: { hour: 11, minute: 0 }, closingTime: { hour: 23, minute: 0 } },
      { dayOfTheWeek: 4, openingTime: { hour: 11, minute: 0 }, closingTime: { hour: 23, minute: 0 } },
      { dayOfTheWeek: 5, openingTime: { hour: 11, minute: 0 }, closingTime: { hour: 23, minute: 0 } },
      { dayOfTheWeek: 6, openingTime: { hour: 11, minute: 0 }, closingTime: { hour: 1, minute: 0 } },
      { dayOfTheWeek: 7, openingTime: { hour: 12, minute: 0 }, closingTime: { hour: 21, minute: 0 } }
    ]);
    expect(openingHoursText.length).toEqual(3);
    expect(openingHoursText[0]).toEqual('Mon-Fri 11:00am - 11:00pm');
    expect(openingHoursText[1]).toEqual('Sat 11:00am - 1:00am');
    expect(openingHoursText[2]).toEqual('Sun 12:00pm - 9:00pm');
  });
});
