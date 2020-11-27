import { Formatter } from './classes/formatter.class.js';
import { Scheduler } from './classes/scheduler.class.js';
import { Span } from './classes/span.class.js';
import { Notifier } from './classes/notifier.class.js';
import { Storage } from './classes/storage.class.js';

import { Belt } from './belt/belt.js';

const header = document.getElementById('utio-header');
const output = document.getElementById('utio-output');
const select = document.getElementById('utio-select');

const scheduler = new Scheduler();
const storage = new Storage('utio');
const belt = new Belt();

const load = (file) => {
  fetch(`config/${file}`)
    .then((response) => response.json())
    .then((config) => {
      scheduler.stop();
      scheduler.read(config);

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
  )} before next, ~${Formatter.getHours(state.scheduleLeft)} until end.`;

  belt.setValue(state.scheduleCurrent);
});

scheduler.addEventListener('remindspanchange', (state) => {
  Notifier.show(`${state.span.title} will end soon!`, {
    body: `It's ${Formatter.getMinutes(state.spanLeft)} before it ends.`,
  });
});

scheduler.addEventListener('spanchange', (state) => {
  header.textContent = `${state.span.title}`;

  belt.setType(Span.getBeltItemType(state.span));
});

const currentConfig = storage.getItem('config') ?? 'work.json';
select.value = currentConfig;
load(currentConfig);

select.addEventListener('change', () => {
  storage.setItem('config', select.value);
  load(select.value);
});
