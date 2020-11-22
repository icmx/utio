import { Formatter } from './classes/formatter.class.js';
import { Scheduler } from './classes/scheduler.class.js';

// this should be fetched I suppose
import { config } from './config.js';

const header = document.getElementById('utio-header');
const progress = document.getElementById('utio-progress');
const output = document.getElementById('utio-output');

let scheduler = new Scheduler();
scheduler.read(config);

scheduler.addEventListener('timechange', (state) => {
  document.title = `${Formatter.getDigits(state.scheduleLeft)} (${
    state.span.title
  }) - utio`;

  progress.value = state.scheduleCurrent;
  progress.max = state.scheduleDuration;

  output.value = `${Formatter.getDigits(
    state.scheduleLeft
  )} left (${Formatter.getDigits(state.spanLeft)} until next)`;
});

scheduler.addEventListener('remindspanchange', (state) => {
  // notifications goes here
  console.log('Remind before span changes.');
});

scheduler.addEventListener('spanchange', (state) => {
  header.textContent = `${state.span.title}`;

  progress.className = `utio-progress utio-progress--${state.span.type}`;
});

scheduler.run();
