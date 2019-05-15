import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { ServerService } from './mock-server.service';
import { Restaurant } from './models';

@Component({
  templateUrl: './create-restaurant-modal.component.html'
})
export class CreateRestaurantModalComponent {

  public restaurant: Restaurant;

  public constructor(public activeModal: NgbActiveModal,
                     private server: ServerService) {
    this.restaurant = {
      name: '',
      openingHours: [
        { dayOfTheWeek: 1, openingTime: undefined, closingTime: undefined },
        { dayOfTheWeek: 2, openingTime: undefined, closingTime: undefined },
        { dayOfTheWeek: 3, openingTime: undefined, closingTime: undefined },
        { dayOfTheWeek: 4, openingTime: undefined, closingTime: undefined },
        { dayOfTheWeek: 5, openingTime: undefined, closingTime: undefined },
        { dayOfTheWeek: 6, openingTime: undefined, closingTime: undefined },
        { dayOfTheWeek: 7, openingTime: undefined, closingTime: undefined }
      ]
    };
  }

  public getDay(dayOfTheWeek: number): string {
    return moment().isoWeekday(dayOfTheWeek).format('dddd');
  }

  public submit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.server.createRestaurant(this.restaurant)
      .subscribe(restaurant => this.activeModal.close(restaurant));
  }
}
