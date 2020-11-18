import { TimePoint } from './time-point.class.js';
import { TimeSpan } from './time-span.class.js';

const EVERY_SECOND = 1000;

export class Schedule {
  spans = [];
  events = {};

  read(config) {
    config.forEach((item) => {
      const [startHours, startMinutes] = item.start.split(':');
      const [endHours, endMinutes] = item.end.split(':');

      this.spans.push(
        new TimeSpan(
          item.title,
          new TimePoint(startHours, startMinutes),
          new TimePoint(endHours, endMinutes),
          item.type
        )
      );
    });
  }

  addEventListener(type, listener) {
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
    let oldState;
    let newState;

    setInterval(() => {
      oldState = newState;
      newState = this.state;

      this.emit('statechange', newState);

      if (oldState?.type !== newState?.type) {
        this.emit('spanchange', newState);
      }
    }, EVERY_SECOND);
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

    return new ScheduleState(current, left, duration, span);
  }
}

class ScheduleState {
  constructor(current, left, duration, span) {
    this.current = current;
    this.left = left;
    this.duration = duration;
    this.span = span;
  }
}
