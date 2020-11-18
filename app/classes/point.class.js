export class Point {
  date = new Date();

  constructor(hours, minutes) {
    this.date.setHours(hours);
    this.date.setMinutes(minutes);
    this.date.setSeconds(0);
  }

  valueOf() {
    return this.date.valueOf();
  }
}
