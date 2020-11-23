import { Formatter } from './classes/formatter.class.js';
import { Scheduler } from './classes/scheduler.class.js';
import { Notifier } from './classes/notifier.class.js';
import { Storage } from './classes/storage.class.js';

const header = document.getElementById('utio-header');
const progress = document.getElementById('utio-progress');
const output = document.getElementById('utio-output');
const selectConfig = document.getElementById('utio-select-config');

const scheduler = new Scheduler();
const storage = new Storage('utio');

const load = (file) => {
  fetch(`config/${file}`)
    .then((response) => response.json())
    .then((config) => {
      scheduler.stop();
      scheduler.read(config);
      scheduler.run();
    });
};

scheduler.addEventListener('timechange', (state) => {
  document.title = `${Formatter.getDigits(state.scheduleLeft)} - utio`;

  progress.value = state.scheduleCurrent;
  progress.max = state.scheduleDuration;

  output.value = `${Formatter.getDigits(
    state.scheduleLeft
  )} left (${Formatter.getDigits(state.spanLeft)} until next)`;
});

scheduler.addEventListener('remindspanchange', (state) => {
  Notifier.show(`${state.span.title} will end soon!`, {
    body: `It's ${Formatter.getFullWords(state.spanLeft)} before it ends.`,
  });
});

scheduler.addEventListener('spanchange', (state) => {
  header.textContent = `${state.span.title}`;

  progress.className = `utio-progress utio-progress--${state.span.type}`;
});

const currentConfigName = storage.getItem('config') ?? 'work.json';
selectConfig.value = currentConfigName;
load(currentConfigName);

selectConfig.addEventListener('change', () => {
  storage.setItem('config', selectConfig.value);
  load(selectConfig.value);
});
