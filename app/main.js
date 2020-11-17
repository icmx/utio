import { TimeSpanType as Type } from './symbols/time-span-type.symbols.js';
import { Schedule } from './classes/schedule.class.js';

import { config } from './config.js';

window.addEventListener('load', function () {
  let progress = document.getElementById('utio-progress');
  let output = document.getElementById('utio-output');
  let header = document.getElementById('utio-header');

  let schedule = new Schedule();
  schedule.read(config);

  function getLabel(value, singular, plural) {
    return value > 0
      ? value > 1
        ? value + ' ' + plural
        : value + ' ' + singular
      : '';
  }

  function getTrailer(hours, minutes, seconds, trailer) {
    return hours > 0 || minutes > 0 || seconds > 0 ? trailer : '';
  }

  function getShortTime(time) {
    let minutes = Math.round(time / 1000 / 60);

    let label = getLabel(minutes, 'min.', 'mins.');
    let trailer = getTrailer(0, minutes, 0, ' left');

    return label + trailer;
  }

  function getFullTime(time) {
    const AND = ' and ';
    const COMMA = ', ';
    const LEFT = ' left.';

    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();

    let hmSeparator = '';
    let msSeparator = '';
    let row =
      (hours > 0 ? 2 : 0) + (minutes > 0 ? 4 : 0) + (seconds > 0 ? 8 : 0);

    // 2  +  4  +  8  +  0     =
    // H     M     S     TRAIL   row
    // x ,   x and x     left. = 14
    // x and x     o     left. = 6
    // x     o and x     left. = 10
    // x     o     o     left. = 2
    // o     x and x     left. = 12
    // o     x     o     left. = 4
    // o     o     x     left. = 8
    // o     o     o           = 0

    switch (row) {
      case 0:
      case 2:
      case 4:
      case 8:
        break;
      case 6:
        hmSeparator = AND;
        break;
      case 10:
      case 12:
        msSeparator = AND;
        break;
      case 14:
        hmSeparator = COMMA;
        msSeparator = AND;
        break;
      default:
        break;
    }

    let hoursLabel = getLabel(hours, 'hour', 'hours');
    let minutesLabel = getLabel(minutes, 'minute', 'minutes');
    let secondsLabel = getLabel(seconds, 'second', 'seconds');

    let trailer = getTrailer(hours, minutes, seconds, LEFT);

    return (
      hoursLabel +
      hmSeparator +
      minutesLabel +
      msSeparator +
      secondsLabel +
      trailer
    );
  }

  function showStatus(status) {
    switch (status.type) {
      case Type.HANGING:
        progress.value = 0;
        header.innerText = '(－ω－) zzZ';
        output.value = "Have a rest! It's not a work time.";
        break;

      // case Type.Before:
      //   break;

      // case Type.Passive:
      //   progress.max = status.max;
      //   progress.value = status.value;
      //   output.value = status.leftFull;
      //   document.name = `utio — ${status.leftShort} (${status.name})`;
      //   header.innerText = status.name;
      //   progress.classList.remove('utio-progress--active');
      //   progress.classList.add('utio-progress--passive');
      //   break;

      case Type.WORKING:
        progress.max = status.max;
        progress.value = status.value;
        output.value = status.leftFull;
        document.title = `utio — ${status.leftShort} (${status.name})`;
        header.innerText = status.name;
        progress.classList.remove('utio-progress--passive');
        progress.classList.add('utio-progress--active');
        break;

      // case Type.After:
      //   break;

      default:
        break;
    }
  }

  setInterval(function () {
    let start = schedule.first.start.date;
    let now = new Date();
    let end = schedule.last.end.date;

    let runtime = end - start;
    let left = end - now;
    let current = runtime - left;

    let dLeftFull = getFullTime(new Date(left));
    let dLeftShort = getShortTime(new Date(left));

    let status = {
      value: current,
      max: runtime,
      type: Type.HANGING,
      name: 'Hanging...',
      leftFull: dLeftFull,
      leftShort: dLeftShort,
    };

    showStatus(status);

    schedule.spans.forEach((item) => {
      if (item.includes(now)) {
        status.type = item.type;
        status.name = item.name;
        showStatus(status);
      }
    });
  }, 1000);

  // this should be used later
  schedule.on('statechange', (e) => {
    console.log('onstatechange:', e);
  });

  schedule.on('statuschange', (e) => {
    console.log('onstatuschange:', e);
  });

  schedule.run();
});
