import { SpanType as Type } from './classes/span.class.js';

export const config = [
  { title: 'Startup',     start: '08:55', end: '09:00', type: Type.BEFORE },
  { title: 'First Half',  start: '09:00', end: '13:00', type: Type.RUNNING },
  { title: 'Lunch',       start: '13:00', end: '14:00', type: Type.HANGING },
  { title: 'Second Half', start: '14:00', end: '18:00', type: Type.RUNNING },
  { title: 'Shutdown',    start: '18:00', end: '18:05', type: Type.AFTER },
];
