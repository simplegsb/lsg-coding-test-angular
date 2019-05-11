import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public date: moment.Moment;
  public time: { hour: number, minute: number };

  public constructor() {
    this.date = moment();
    this.time = {
      hour: this.date.hours(),
      minute: this.date.minutes()
    };
  }
}
