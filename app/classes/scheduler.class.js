import { Formatter } from './formatter.class.js';
import { Point } from './point.class.js';
import { Span } from './span.class.js';

const _EVERY_SECOND = 1000;

export const SchedulerEventTypes = Object.freeze([
  'timechange',
  'remindspanchange',
  'spanchange',
]);

export class Scheduler {
  _events = {};
  _spans = [];

  _emit(type, ...args) {
    this._events[type].forEach((listener) => listener(...args));
  }

  read(config) {
    config.spans.forEach((item) => {
      const [startHours, startMinutes] = item.start.split(':');
      const [endHours, endMinutes] = item.end.split(':');

      this._spans.push(
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
    if (SchedulerEventTypes.includes(type)) {
      this._events[type] = this._events[type] || [];
      this._events[type].push(listener);
    }
  }

  getSpanByPoint(point) {
    return this._spans.find((span) => span.includes(point));
  }

  run() {
    // this makes not much sense for now, because state change is
    // emitting each second entirely

    let oldState;
    let newState;

    setInterval(() => {
      oldState = newState;
      newState = this.state;

      this._emit('timechange', newState);

      if (oldState?.type !== newState?.type) {
        this._emit('spanchange', newState);
      }
    }, _EVERY_SECOND);
  }

  get start() {
    return this._spans[0].start;
  }

  get end() {
    return this._spans[this._spans.length - 1].end;
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
