import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { Server } from './mock-server.service';
import { OpeningHours, Restaurant, TimeOfDay } from './models';
import { CreateRestaurantModalComponent } from './create-restaurant-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public restaurants: Restaurant[];

  public date: moment.Moment;
  public time: TimeOfDay;

  public constructor(private modalService: NgbModal,
                     private server: Server) {
    this.date = moment();
    this.time = { hour: this.date.hours(), minute: this.date.minutes() };

    this.server.getRestaurants()
      .subscribe((restaurants) => this.restaurants = restaurants);
  }

  public add(): void {
    this.modalService.open(CreateRestaurantModalComponent, { size: 'lg' }).result
      .then((restaurant) => {
        if (restaurant) {
          this.restaurants.push(restaurant);
        }
      });
  }

  public getOpeningHoursText(allOpeningHours: OpeningHours[]): string[] {
    const allOpeningHoursText: string[] = [];

    allOpeningHours.sort((a, b) => a.dayOfTheWeek - b.dayOfTheWeek);

    // Determine the first days of groups with the same hours
    const starts: OpeningHours[] = [];
    for (const openingHours of allOpeningHours) {
      if (!starts.length) {
        starts.push(openingHours);
        continue;
      }

      const lastStart = starts[starts.length - 1];

      if (openingHours.openingTime.hour !== lastStart.openingTime.hour ||
          openingHours.openingTime.minute !== lastStart.openingTime.minute ||
          openingHours.closingTime.hour !== lastStart.closingTime.hour ||
          openingHours.closingTime.minute !== lastStart.closingTime.minute) {
        starts.push(openingHours);
      }
    }

    // Format the opening hours for the groups
    for (let index = 0; index < starts.length; index++) {
      const start = starts[index];
      let nextStart: OpeningHours;

      if (index === starts.length - 1) {
        nextStart = { dayOfTheWeek: 8, openingTime: undefined, closingTime: undefined };
      } else {
        nextStart = starts[index + 1];
      }

      let openingHoursText = '';

      if (nextStart.dayOfTheWeek - start.dayOfTheWeek === 1) {
        openingHoursText = moment().isoWeekday(start.dayOfTheWeek).format('ddd');
      } else {
        openingHoursText = moment().isoWeekday(start.dayOfTheWeek).format('ddd') + '-' +
          moment().isoWeekday(nextStart.dayOfTheWeek - 1).format('ddd');
      }

      openingHoursText += ' ';

      const openingTime = moment();
      openingTime.hours(start.openingTime.hour);
      openingTime.minutes(start.openingTime.minute);
      openingHoursText += openingTime.format('hh:mma');

      openingHoursText += ' - ';

      const closingTime = moment();
      closingTime.hours(start.closingTime.hour);
      closingTime.minutes(start.closingTime.minute);
      openingHoursText += closingTime.format('hh:mma');

      allOpeningHoursText.push(openingHoursText);
    }

    return allOpeningHoursText;
  }
}
