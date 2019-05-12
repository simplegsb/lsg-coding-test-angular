import { Component } from '@angular/core';
import * as moment from 'moment';

import { Server } from './mock-server.service';
import { Restaurant, TimeOfDay } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public restaurants: Restaurant[];

  public date: moment.Moment;
  public time: TimeOfDay;

  public constructor(private server: Server) {
    this.date = moment();
    this.time = {
      hour: this.date.hours(),
      minute: this.date.minutes()
    };

    this.server.getRestaurants()
      .subscribe((restaurants) => this.restaurants = restaurants);
  }
}
