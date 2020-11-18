function _constructMap(...entries) {
  let result = new Map();

  entries.map(([key, value]) => result.set(key, value));
  return result;
}

export const BEFORE = 'TIME_SPAN_TYPE_BEFORE';
export const RUNNING = 'TIME_SPAN_TYPE_RUNNING';
export const HANGING = 'TIME_SPAN_TYPE_HANGING';
export const AFTER = 'TIME_SPAN_TYPE_AFTER';
export const NONE = 'TIME_SPAN_TYPE_NONE';

// get 'value' from 'TIME_SPAN_TYPE_value'
// very rough
export const getCleanValue = (value) => value.split('_')[3].toLowerCase();

export const values = _constructMap(
  [
    BEFORE,
    {
      title: 'Getting Ready...',
      caption: 'It will start very soon.'
    },
  ],
  [
    RUNNING,
    {
      title: 'Working Now',
      caption: null
    }
  ],
  [
    HANGING,
    {
      title: 'Hanging Now',
      caption: null
    }
  ],
  [
    AFTER,
    {
      title: 'Relax!',
      caption: 'Yeah! It\'s over now.'
    },
  ],
  [
    NONE,
    {
      title: '(－ω－) zzZ',
      caption: 'I suppose it\'s not a work time. Have a rest, too!'
    },
  ]
);
