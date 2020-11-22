export const config = {
  spans: [
    { title: 'Startup',     start: '08:55', end: '09:00', type: 'before' },
    { title: 'First Half',  start: '09:00', end: '13:00', type: 'running' },
    { title: 'Lunch',       start: '13:00', end: '14:00', type: 'hanging' },
    { title: 'Second Half', start: '14:00', end: '18:00', type: 'running' },
    { title: 'Shutdown',    start: '18:00', end: '18:05', type: 'after' },
  ],
  remindBefore: 5
};
