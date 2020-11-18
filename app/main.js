import * as TimeSpanTypes from './symbols/time-span-type.symbols.js';

import { Schedule } from './classes/schedule.class.js';
import { config } from './config.js';

window.addEventListener('load', function () {
  const header = document.getElementById('utio-header');
  const progress = document.getElementById('utio-progress');
  const output = document.getElementById('utio-output');

  const applyState = (
    value,
    max,
    title,
    caption,
    modifier,
    fullWords,
    digits
  ) => {
    document.title = `${digits} left. - utio`;

    header.innerText = title;

    progress.classList.value = `utio-progress utio--${modifier}`;
    progress.value = value;
    progress.max = max;

    output.value = `${fullWords} left.`;
  };

  let schedule = new Schedule();
  schedule.read(config);

  schedule.addEventListener('statechange', (state) => {
    applyState(
      state.value,
      state.max,
      state.title,
      state.caption,
      '',
      state.fullWordsLeft,
      state.digitsLeft
    );
  });

  schedule.addEventListener('spanchange', (e) => {
    // console.log('onspanchange:', e);
  });

  schedule.run();
});
