import { Scheduler } from './classes/scheduler.class.js';

import { config } from './config.js';

window.addEventListener('load', () => {
  const header = document.getElementById('utio-header');
  const progress = document.getElementById('utio-progress');
  const output = document.getElementById('utio-output');

  let scheduler = new Scheduler();
  scheduler.read(config);

  scheduler.addEventListener('timechange', (state) => {
    if (state.span) {
      document.title = `${state.leftAsDigits} left. (${state.span.title}) - utio`;

      header.innerText = `${state.span.title}`;

      progress.className = `utio-progress utio-progress--${state.span.type}`;
      progress.value = state.current;
      progress.max = state.duration;

      output.value = `${state.leftAsFullWords} left.`;
    } else {
      document.title = 'Rest! - utio';

      header.innerText = '(－ω－) zzZ';

      progress.className = 'utio-progress utio-progress--rest';
      progress.value = 0;
      progress.max = 0;

      output.value = 'Have a rest! It is not a work time.';
    }
  });

  scheduler.run();
});
