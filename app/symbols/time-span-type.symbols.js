function constructMap(...entries) {
  let result = new Map();

  entries.map(([key, value]) => result.set(key, value));
  return result;
}

export const UNKNOWN = 'TIME_SPAN_TYPE_UNKNOWN';
export const BEFORE = 'TIME_SPAN_TYPE_BEFORE';
export const RUNNING = 'TIME_SPAN_TYPE_RUNNING';
export const HANGING = 'TIME_SPAN_TYPE_HANGING';
export const AFTER = 'TIME_SPAN_TYPE_AFTER';
export const RESTING = 'TIME_SPAN_TYPE_RESTING';

export const Defaults = constructMap(
  [
    UNKNOWN,
    {
      title: 'ᕕ( ᐛ )ᕗ',
      caption: 'Please wait, we\'re almost there...'
    },
  ],
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
    RESTING,
    {
      title: '(－ω－) zzZ',
      caption: 'Have a rest! It\'s not a work time.'
    },
  ]
);
