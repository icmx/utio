import { TimePoint } from './time-point.class.js';
import { TimeSpan } from './time-span.class.js';
import { TimeFormatter } from './time-formatter.class.js';

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

    // refactor this later
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
    // const duration = this.end - this.start;
    // const left = this.end - now;
    // const current = duration - left;
    const span = this.getSpanByPoint(now);

    const state = new ScheduleState(
      now,
      this.start,
      this.end,
      span.type,
      span.title,
      span.caption
    );

    return state;
  }
}

class ScheduleState {
  constructor(now, start, end, type, title, caption) {
    const duration = end - start;
    const left = end - now;
    const current = duration - left;

    this.value = current;
    this.max = duration;
    this.type = type;
    this.title = title;
    this.caption = caption;
    this.fullWordsLeft = TimeFormatter.getFullWords(left);
    this.digitsLeft = TimeFormatter.getDigits(left);
  }
}
