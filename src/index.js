import './app/style.css';
import { Formatter } from './app/classes/formatter.class';
import { Scheduler } from './app/classes/scheduler.class';
import { Notifier } from './app/classes/notifier.class';
import { Storage } from './app/classes/storage.class';

import './belt/belt.css';
import { Belt } from './belt/belt.js';

const scheduler = new Scheduler();
const storage = new Storage('utio');
const belt = new Belt();

const header = document.getElementById('utio-header');
const output = document.getElementById('utio-output');
const select = document.getElementById('utio-select');

const load = (file) => {
  fetch(`app/config/${file}`)
    .then((response) => response.json())
    .then((config) => {
      scheduler.stop();
      scheduler.init(config);

      belt.init(
        document.getElementById('utio-belt'),
        scheduler.getBeltOptions()
      );

      scheduler.run();
    });
};

scheduler.addEventListener('timechange', (state) => {
  document.title = `${Formatter.getDigits(state.scheduleLeft)} - utio`;

  output.value = `${Formatter.getDigits(
    state.spanLeft
  )} before next, ~${Formatter.getHours(
    state.scheduleLeft
  )} until end.`;

  belt.setValue(state.scheduleCurrent);
});

scheduler.addEventListener('remindspanchange', (state) => {
  Notifier.show(`${state.span.title} will end soon!`, {
    body: `It's ${Formatter.getMinutes(
      state.spanLeft
    )} before it ends.`,
  });
});

scheduler.addEventListener('spanchange', (state) => {
  header.textContent = `${state.span.title}`;

  belt.resetSelection();

  if (state.spanIndex > -1) {
    belt.selectItem(state.spanIndex);
  }
});

const currentConfig = storage.getItem('config') ?? 'work-local.json';
select.value = currentConfig;
load(currentConfig);

select.addEventListener('change', () => {
  storage.setItem('config', select.value);
  load(select.value);
});
