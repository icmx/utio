const _SECOND = 1e3;
const _MINUTE = _SECOND * 60;
const _HOUR = _MINUTE * 60;
const _DAY = _HOUR * 24;

const _pluralize = (value, singular, plural) => (value > 1 ? plural : singular);

const _label = (value, singular, plural) =>
  value ? value + ' ' + _pluralize(value, singular, plural) : '';

const _pad = (value, size) => value.toString().padStart(size, '0');

export class Formatter {
  static getFullWords(time) {
    const AND = ' and ';
    const COMMA = ', ';

    const date = new Date(time);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    let hoursMinutesDelimiter = '';
    let minutesSecondsDelimiter = '';

    // now, we have to get a "row" in a following virtual "table":
    //
    //   H       M       S
    //   8   +   4   +   2  =  row ("V" if have value)
    //   V  ,    V  and  V  =  14
    //   V  and  V          =  12
    //   V          and  V  =  10
    //   V                  =  8
    //           V  and  V  =  6
    //           V          =  4
    //                   V  =  2
    //                      =  0
    //
    // p.s. yes, i know, there is a better solution (binary search-
    // based maybe?), but for now i'm not really good at theory, sorry.

    const row = (hours ? 8 : 0) + (minutes ? 4 : 0) + (seconds ? 2 : 0);

    switch (row) {
      case 0:
      case 2:
      case 4:
      case 8:
        break;
      case 6:
      case 10:
        minutesSecondsDelimiter = AND;
        break;
      case 12:
        hoursMinutesDelimiter = AND;
        break;
      case 14:
        hoursMinutesDelimiter = COMMA;
        minutesSecondsDelimiter = AND;
        break;
      default:
        break;
    }

    const hoursLabel = _label(hours, 'hour', 'hours');
    const minutesLabel = _label(minutes, 'minute', 'minutes');
    const secondsLabel = _label(seconds, 'second', 'seconds');

    return (
      hoursLabel +
      hoursMinutesDelimiter +
      minutesLabel +
      minutesSecondsDelimiter +
      secondsLabel
    );
  }

  static getDigits(time) {
    const milliseconds = time;
    const hours = ((milliseconds % _DAY) / _HOUR) | 0;
    const minutes = ((milliseconds % _HOUR) / _MINUTE) | 0;
    const seconds = ((milliseconds % _MINUTE) / _SECOND) | 0;

    return `${_pad(hours, 2)}:${_pad(minutes, 2)}:${_pad(seconds, 2)}`;
  }

  static getHours(time) {
    const rounded = Math.round(time / 1000 / 60 / 60);

    return `${rounded} ${_pluralize(rounded, 'hour', 'hours')}`;
  }

  static getMinutes(time) {
    const rounded = Math.round(time / 1000 / 60);

    return `${rounded} ${_pluralize(rounded, 'minute', 'minutes')}`;
  }
}
