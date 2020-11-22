export class Time {
  _date = new Date();

  constructor(hours, minutes) {
    this._date.setHours(hours);
    this._date.setMinutes(minutes);
    this._date.setSeconds(0);
  }

  valueOf() {
    return this._date.valueOf();
  }
}
