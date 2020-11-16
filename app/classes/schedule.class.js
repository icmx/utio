import { TimePoint } from './time-point.class.js';
import { TimeSpan } from './time-span.class.js';

export class Schedule {
  spans = [];

  read(config) {
    config.forEach((item) => {
      const [startHours, startMinutes] = item.start.split(':');
      const [endHours, endMinutes] = item.end.split(':');

      this.spans.push(
        new TimeSpan(
          item.name,
          new TimePoint(startHours, startMinutes),
          new TimePoint(endHours, endMinutes),
          item.type
        )
      );
    });
  }

  get first() {
    return this.spans[0];
  }

  get last() {
    return this.spans[this.spans.length - 1];
  }
}
