import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import {Server} from './mock-server.service';
import { Restaurant } from './models';

@Component({
  templateUrl: './create-restaurant-modal.component.html'
})
export class CreateRestaurantModalComponent {

  public restaurant: Restaurant;

  public constructor(public activeModal: NgbActiveModal,
                     private server: Server) {
    this.restaurant = {
      name: '',
      openingHours: [
        { dayOfTheWeek: 1, openingTime: { hour: undefined, minute: undefined }, closingTime: { hour: undefined, minute: undefined } },
        { dayOfTheWeek: 2, openingTime: { hour: undefined, minute: undefined }, closingTime: { hour: undefined, minute: undefined } },
        { dayOfTheWeek: 3, openingTime: { hour: undefined, minute: undefined }, closingTime: { hour: undefined, minute: undefined } },
        { dayOfTheWeek: 4, openingTime: { hour: undefined, minute: undefined }, closingTime: { hour: undefined, minute: undefined } },
        { dayOfTheWeek: 5, openingTime: { hour: undefined, minute: undefined }, closingTime: { hour: undefined, minute: undefined } },
        { dayOfTheWeek: 6, openingTime: { hour: undefined, minute: undefined }, closingTime: { hour: undefined, minute: undefined } },
        { dayOfTheWeek: 7, openingTime: { hour: undefined, minute: undefined }, closingTime: { hour: undefined, minute: undefined } }
      ]
    };
  }

  public getDay(dayOfTheWeek: number): string {
    return moment().isoWeekday(dayOfTheWeek).format('dddd');
  }

  public save() {
    this.server.createRestaurant(this.restaurant)
      .subscribe(restaurant => this.activeModal.close(restaurant));
  }
}
