import * as TimeSpanTypes from './symbols/time-span-type.symbols.js';

export const config = [
  { title: 'Startup',     start: '08:50', end: '09:00', type: TimeSpanTypes.BEFORE },
  { title: 'First Half',  start: '09:00', end: '13:00', type: TimeSpanTypes.RUNNING },
  { title: 'Lunch',       start: '13:00', end: '14:00', type: TimeSpanTypes.HANGING },
  { title: 'Second Half', start: '14:00', end: '18:00', type: TimeSpanTypes.RUNNING },
  { title: 'Shutdown',    start: '18:00', end: '18:10', type: TimeSpanTypes.AFTER }
];
