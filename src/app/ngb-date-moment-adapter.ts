import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

export class NgbDateMomentAdapter extends NgbDateAdapter<moment.Moment> {

  fromModel(date: moment.Moment): NgbDateStruct {
    if (!date || !moment.isMoment(date)) {
      return null;
    }

    return {
      year: date.year(),
      month: date.month() + 1,
      day: date.date(),
    };
  }

  toModel(dateStruct: NgbDateStruct): moment.Moment {
    if (!dateStruct || !Number.isInteger(dateStruct.year) || !Number.isInteger(dateStruct.month) || !Number.isInteger(dateStruct.day)) {
      return null;
    }

    const date = moment();
    date.year(dateStruct.year);
    date.month(dateStruct.month - 1);
    date.date(dateStruct.day);
    date.startOf('day');

    return date;
  }
}
