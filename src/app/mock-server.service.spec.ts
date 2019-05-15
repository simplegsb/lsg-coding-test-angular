import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { of } from 'rxjs';

import { ServerService } from './mock-server.service';
import {flatMap} from 'rxjs/operators';

describe('MockServer', () => {

  let service: ServerService;
  const testData = {
    restaurants: [{
      name: 'Kayasa Restaurant',
      opening_hours: 'Mon-Sun 8:30 am - 9 pm'
    }, {
      name: 'The Golden Duck',
      opening_hours: 'Mon-Sun 11 am - 11 pm'
    }, {
      name: 'World\'s Best Steakhouse',
      opening_hours: 'Mon-Fri 11 am - 11 pm; Sat 11 am - 1 am; Sun 12 pm - 9 pm'
    }, {
      name: 'Tandoori Mahal',
      opening_hours: 'Mon-Thu 11 am - 10:30 pm; Fri 11 am - 11 pm; Sat 11:30 am - 11 pm; Sun 4:30 pm - 10:30 pm'
    }, {
      name: 'Coffee and Bagels',
      opening_hours: 'Thu-Sun 11:30 am - 4 pm'
    }]
  };

  beforeEach(() => {
    const fakeHttpClient: any = { get(url: string) { return of(testData); } };
    service = new ServerService(fakeHttpClient as HttpClient);
  });

  it('#getRestaurants should parse restaurant data correctly', (done: DoneFn) => {
    service.getRestaurants()
      .subscribe(restaurants => {
        expect(restaurants.length).toBe(5);
        expect(restaurants[2].name).toBe('World\'s Best Steakhouse');
        expect(restaurants[2].openingHours.length).toBe(7);
        expect(restaurants[2].openingHours[0].dayOfTheWeek).toBe(1);
        expect(restaurants[2].openingHours[0].openingTime.hour).toBe(11);
        expect(restaurants[2].openingHours[0].openingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[0].closingTime.hour).toBe(23);
        expect(restaurants[2].openingHours[0].closingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[1].dayOfTheWeek).toBe(2);
        expect(restaurants[2].openingHours[1].openingTime.hour).toBe(11);
        expect(restaurants[2].openingHours[1].openingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[1].closingTime.hour).toBe(23);
        expect(restaurants[2].openingHours[1].closingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[2].dayOfTheWeek).toBe(3);
        expect(restaurants[2].openingHours[2].openingTime.hour).toBe(11);
        expect(restaurants[2].openingHours[2].openingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[2].closingTime.hour).toBe(23);
        expect(restaurants[2].openingHours[2].closingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[3].dayOfTheWeek).toBe(4);
        expect(restaurants[2].openingHours[3].openingTime.hour).toBe(11);
        expect(restaurants[2].openingHours[3].openingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[3].closingTime.hour).toBe(23);
        expect(restaurants[2].openingHours[3].closingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[4].dayOfTheWeek).toBe(5);
        expect(restaurants[2].openingHours[4].openingTime.hour).toBe(11);
        expect(restaurants[2].openingHours[4].openingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[4].closingTime.hour).toBe(23);
        expect(restaurants[2].openingHours[4].closingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[5].dayOfTheWeek).toBe(6);
        expect(restaurants[2].openingHours[5].openingTime.hour).toBe(11);
        expect(restaurants[2].openingHours[5].openingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[5].closingTime.hour).toBe(1);
        expect(restaurants[2].openingHours[5].closingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[6].dayOfTheWeek).toBe(7);
        expect(restaurants[2].openingHours[6].openingTime.hour).toBe(12);
        expect(restaurants[2].openingHours[6].openingTime.minute).toBe(0);
        expect(restaurants[2].openingHours[6].closingTime.hour).toBe(21);
        expect(restaurants[2].openingHours[6].closingTime.minute).toBe(0);
        done();
      });
  });

  it('#getRestaurants should filter based on date and time', (done: DoneFn) => {
    service.getRestaurants(moment('2019-05-15'), { hour: 22, minute: 45 })
      .subscribe(restaurants => {
        expect(restaurants.length).toBe(2);
        expect(restaurants[0].name).toBe('The Golden Duck');
        expect(restaurants[1].name).toBe('World\'s Best Steakhouse');
        done();
      });
  });

  it('#getRestaurants should filter based on date and time - early morning hours', (done: DoneFn) => {
    service.getRestaurants(moment('2019-05-19'), { hour: 0, minute: 30 })
      .subscribe(restaurants => {
        expect(restaurants.length).toBe(1);
        expect(restaurants[0].name).toBe('World\'s Best Steakhouse');
        done();
      });
  });

  it('#createRestaurant should add a restaurant', (done: DoneFn) => {
    service.createRestaurant({
      name: 'Gaza\'s really fast restaurant',
      openingHours: [ { dayOfTheWeek: 1, openingTime: { hour: 0, minute: 0 }, closingTime: { hour: 0, minute: 0 } } ]
    })
      .pipe(flatMap(() => service.getRestaurants()))
      .subscribe(restaurants => {
        expect(restaurants.length).toBe(6);
        expect(restaurants[5].name).toBe('Gaza\'s really fast restaurant');
        done();
      });
  });
});
