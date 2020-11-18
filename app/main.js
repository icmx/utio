import * as TimeSpanTypes from './symbols/time-span-type.symbols.js';

import { Schedule } from './classes/scheduler.class.js';
import { config } from './config.js';
import { Formatter } from './classes/formatter.class.js';

window.addEventListener('load', () => {
  const header = document.getElementById('utio-header');
  const progress = document.getElementById('utio-progress');
  const output = document.getElementById('utio-output');

  let schedule = new Schedule();
  schedule.read(config);

  schedule.addEventListener('statechange', (state) => {
    if (state.span) {
      document.title = `${Formatter.getDigits(state.left)} left. (${
        state.span.title
      }) - utio`;

      header.innerText = `${state.span.title}`;

      progress.classList.value = `utio-progress utio-progress--${TimeSpanTypes.getCleanValue(
        state.span.type
      )}`;
      progress.value = state.current;
      progress.max = state.duration;

      output.value = `${Formatter.getFullWords(state.left)} left.`;
    } else {
      document.title = 'Rest! - utio';

      header.innerText = '(－ω－) zzZ';

      progress.classList.value = 'utio-progress utio-progress--rest';
      progress.value = 0;
      progress.max = 0;

      output.value = 'Have a rest! It is not a work time.';
    }
  });

  // this might be useful for notifications e.g.
  // schedule.addEventListener('spanchange', (state) => {
  //   console.log('onspanchange:', e);
  // });

  schedule.run();
});
