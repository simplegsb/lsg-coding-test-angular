import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { OpeningHours, Restaurant, TimeOfDay } from './models';

const ISO_DAYS_OF_THE_WEEK: Map<string, number> = new Map<string, number>([
  [ 'Mon', 1 ],
  [ 'Tue', 2 ],
  [ 'Wed', 3 ],
  [ 'Thu', 4 ],
  [ 'Fri', 5 ],
  [ 'Sat', 6 ],
  [ 'Sun', 7 ]
]);

@Injectable()
export class Server {

  private restaurants: Restaurant[];

  public constructor(private http: HttpClient) {
  }

  public createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    this.restaurants.push(restaurant);
    return of(restaurant);
  }

  public getRestaurants(date?: moment.Moment, time?: TimeOfDay): Observable<Restaurant[]> {
    let observable: Observable<Restaurant[]>;

    if (this.restaurants) {
      observable = of(this.restaurants);
    } else {
      // Concurrent calls to this function could result in multiple "loads" but since this is just a mock server it isn't really a big deal
      observable = this.loadRestaurants();
    }

    return observable
      .pipe(map(restaurants => this.filterRestaurants(restaurants.slice(), date, time)));
  }

  private loadRestaurants(): Observable<Restaurant[]> {
    return this.http.get(`assets/restaurant_data.json?t=${new Date().getTime()}`)
      .pipe(
        map(response => this.parseRestaurants(response)),
        tap(restaurants => this.restaurants = restaurants)
      );
  }

  private filterRestaurants(restaurants: Restaurant[], date: moment.Moment, time: TimeOfDay): Restaurant[] {
    return restaurants.filter(restaurant => {
      for (const openingHours of restaurant.openingHours) {
        if (!date || openingHours.dayOfTheWeek === date.isoWeekday()) {
          if (!time) {
            return true;
          }

          if (this.isBefore(time, openingHours.openingTime)) {
            return false;
          }

          if (this.isBefore(openingHours.openingTime, openingHours.closingTime) && !this.isAfter(time, openingHours.closingTime)) {
            return true;
          }

          continue;
        }

        let dayBefore = (date.isoWeekday() - 1) % 7;
        if (dayBefore === 0) {
          dayBefore = 7;
        }

        // Opening hours may continue into the following day
        if (openingHours.dayOfTheWeek === dayBefore) {
          if (this.isBefore(openingHours.closingTime, openingHours.openingTime) && !this.isAfter(time, openingHours.closingTime)) {
            return true;
          }
        }
      }

      return false;
    });
  }

  private parseRestaurants(restaurantsData: any): Restaurant[] {

    const restaurants: Restaurant[] = [];

    for (const restaurantData of restaurantsData.restaurants) {
      restaurants.push({
        name: restaurantData.name,
        openingHours: this.parseAllOpeningHours(restaurantData.opening_hours)
      });
    }

    return restaurants;
  }

  private parseAllOpeningHours(allOpeningHoursData: any): OpeningHours[] {

    const openingHours: OpeningHours[] = [];

    for (let openingHoursData of allOpeningHoursData.split(';')) {
      openingHoursData = openingHoursData.trim();

      const days = openingHoursData.split(' ')[0];
      const times = openingHoursData.substring(days.length).split('-');

      if (days.includes('-')) {
        const startAndEndDays = days.split('-');
        const startDayIso = ISO_DAYS_OF_THE_WEEK.get(startAndEndDays[0]);
        const endDayIso = ISO_DAYS_OF_THE_WEEK.get(startAndEndDays[1]);
        for (const dayIso of Array.from(ISO_DAYS_OF_THE_WEEK.values())) {
          if (startDayIso < endDayIso && dayIso >= startDayIso && dayIso <= endDayIso) {
            openingHours.push(this.parseOpeningHours(dayIso, times[0], times[1]));
          } else if (startDayIso > endDayIso && dayIso >= startDayIso || dayIso <= endDayIso) {
            openingHours.push(this.parseOpeningHours(dayIso, times[0], times[1]));
          }
        }
      } else {
        openingHours.push(this.parseOpeningHours(ISO_DAYS_OF_THE_WEEK.get(days), times[0], times[1]));
      }
    }

    return openingHours;
  }

  private parseOpeningHours(dayOfTheWeek: number, openingTimeData: string, closingTimeData: string): OpeningHours {
    const openingTimeMoment = moment(openingTimeData, 'hh:mm A');
    const closingTimeMoment = moment(closingTimeData, 'hh:mm A');

    return {
      dayOfTheWeek,
      openingTime: { hour: openingTimeMoment.hours(), minute: openingTimeMoment.minutes() },
      closingTime: { hour: closingTimeMoment.hours(), minute: closingTimeMoment.minutes() }
    };
  }

  private isAfter(a: TimeOfDay, b: TimeOfDay) {
    return a.hour > b.hour || (a.hour === b.hour && a.minute > b.minute);
  }

  private isBefore(a: TimeOfDay, b: TimeOfDay) {
    return a.hour < b.hour || (a.hour === b.hour && a.minute < b.minute);
  }
}
