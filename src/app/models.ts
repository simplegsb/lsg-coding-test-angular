export interface OpeningHours {
  dayOfTheWeek: number;
  openingTime: TimeOfDay;
  closingTime: TimeOfDay;
}

export interface Restaurant {
  name: string;
  openingHours: OpeningHours[];
  openingHoursText: string[];
}

export interface TimeOfDay {
  hour: number;
  minute: number;
}
