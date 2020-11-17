import { TimePoint } from './time-point.class.js';
import { TimeSpan } from './time-span.class.js';

export class Schedule {
  spans = [];
  events = {};

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

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((listener) => listener(...args));
    }
  }

  getSpanByPoint(point) {
    return this.spans.find((span) => span.includes(point));
  }

  run() {
    let stateLast = undefined;
    let stateCurrent = undefined;

    // refactor this later
    setInterval(() => {
      stateLast = stateCurrent;
      stateCurrent = this.state;

      if (stateLast?.span !== stateCurrent?.span) {
        this.emit('spanchange', 'span is changed');
      }

      this.emit('statechange', 'state is changed');
    }, 1000);
  }

  // deprecated
  get first() {
    return this.spans[0];
  }

  // deprecated
  get last() {
    return this.spans[this.spans.length - 1];
  }

  get start() {
    return this.spans[0].start;
  }

  get end() {
    return this.spans[this.spans.length - 1].end;
  }

  get state() {
    const now = Date.now();
    const duration = this.end - this.start;
    const left = this.end - now;
    const current = duration - left;
    const span = this.getSpanByPoint(now);

    return {
      value: current,
      max: duration,
      span: span,
    };
  }
}
