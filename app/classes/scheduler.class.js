import { Formatter } from './formatter.class.js';
import { Point } from './point.class.js';
import { Span } from './span.class.js';

const _EVERY_SECOND = 1000;

export class Scheduler {
  spans = [];
  events = {};

  read(config) {
    config.forEach((item) => {
      const [startHours, startMinutes] = item.start.split(':');
      const [endHours, endMinutes] = item.end.split(':');

      this.spans.push(
        new Span(
          item.title,
          new Point(startHours, startMinutes),
          new Point(endHours, endMinutes),
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
    // this makes not much sense for now, because state change is
    // emitting each second entirely

    let oldState;
    let newState;

    setInterval(() => {
      oldState = newState;
      newState = this.state;

      this.emit('statechange', newState);

      if (oldState?.type !== newState?.type) {
        this.emit('spanchange', newState);
      }
    }, _EVERY_SECOND);
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

    const leftAsDigits = Formatter.getDigits(left);
    const leftAsFullWords = Formatter.getFullWords(left);

    const span = this.getSpanByPoint(now);

    return new SchedulerState(
      duration,
      leftAsDigits,
      leftAsFullWords,
      current,
      span
    );
  }
}

class SchedulerState {
  constructor(duration, leftAsDigits, leftAsFullWords, current, span) {
    this.current = current;
    this.leftAsDigits = leftAsDigits;
    this.leftAsFullWords = leftAsFullWords;
    this.duration = duration;
    this.span = span;
  }
}
