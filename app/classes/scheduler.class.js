import { Span } from './span.class.js';
import { Time } from './time.class.js';

const _EVERY_SECOND = 1000;

export const SchedulerEventTypes = Object.freeze([
  'timechange',
  'remindspanchange',
  'spanchange',
]);

export class Scheduler {
  _events = {};
  _spans = [];
  _remindBefore = 0;

  _start = 0;
  _end = 0;

  _emit(type, ...args) {
    // Promises here, maybe?
    this._events[type].forEach((listener) => listener(...args));
  }

  _getSpanByTime(time) {
    return this._spans.find((span) => span.includes(time)) ?? Span.rest;
  }

  _getState() {
    const now = Date.now();
    const span = this._getSpanByTime(now);

    if (span.type === 'rest') {
      return new SchedulerState(0, 0, 0, 0, span);
    } else {
      const now = Date.now();

      const scheduleDuration = this._end - this._start;
      const scheduleLeft = this._end - now;
      const scheduleCurrent = scheduleDuration - scheduleLeft;

      const spanLeft = span.end - now;

      return new SchedulerState(
        scheduleDuration,
        scheduleCurrent,
        scheduleLeft,
        spanLeft,
        span
      );
    }
  }

  read(config) {
    config.spans.forEach((item) => {
      const [startHours, startMinutes] = item.start.split(':');
      const [endHours, endMinutes] = item.end.split(':');

      this._spans.push(
        new Span(
          item.title,
          new Time(startHours, startMinutes),
          new Time(endHours, endMinutes),
          item.type
        )
      );
    });

    this._remindBefore = config.remindBefore * 60 * 1000;

    this._start = this._spans[0].start;
    this._end = this._spans[this._spans.length - 1].end;
  }

  addEventListener(type, listener) {
    if (SchedulerEventTypes.includes(type)) {
      this._events[type] = this._events[type] || [];
      this._events[type].push(listener);
    }
  }

  run() {
    let oldState;
    let newState = this._getState();
    this._emit('spanchange', newState);
    this._emit('timechange', newState);


    setInterval(() => {
      // That's not good enough, maybe multiple setTimeouts will help?
      // They can trigger avents by timeout, not by infinite ifs.

      oldState = newState;
      newState = this._getState();

      if (newState.span.type !== 'rest') {
        this._emit('timechange', newState);
      }

      if (Math.abs(newState.spanLeft - this._remindBefore) < 500) {
        // it can't be compared directly because of milliseconds little
        // difference

        this._emit('spanchange', newState);
      }

      if (oldState.span.type !== newState.span.type) {
        this._emit('spanchange', newState);
      }
    }, _EVERY_SECOND);
  }
}

class SchedulerState {
  constructor(scheduleDuration, scheduleCurrent, scheduleLeft, spanLeft, span) {
    this.scheduleDuration = scheduleDuration;
    this.scheduleCurrent = scheduleCurrent;
    this.scheduleLeft = scheduleLeft;
    this.spanLeft = spanLeft;
    this.span = span;
  }
}
