import { TimeSpanType as Type } from './symbols/time-span-type.symbols.js';

export const config = [
  { name: 'Startup',     start: '08:50', end: '09:00', type: Type.HANGING },
  { name: 'First Half',  start: '09:00', end: '13:00', type: Type.WORKING },
  { name: 'Lunch',       start: '13:00', end: '14:00', type: Type.WORKING },
  { name: 'Second Half', start: '14:00', end: '18:00', type: Type.WORKING },
  { name: 'Shutdown',    start: '18:00', end: '21:10', type: Type.WORKING }
];
