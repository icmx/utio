import { Formatter } from './classes/formatter.class.js';
import { Scheduler } from './classes/scheduler.class.js';
import { Notifier } from './classes/notifier.class.js';

const header = document.getElementById('utio-header');
const progress = document.getElementById('utio-progress');
const output = document.getElementById('utio-output');

let scheduler = new Scheduler();

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

fetch('config/work.json')
  .then((response) => response.json())
  .then((config) => {
    scheduler.read(config);
    scheduler.run();
  });
