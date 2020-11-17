function constructSymbols(...items) {
  let result = Object.create(null);
  items.forEach((item) => (result[item] = Symbol(item)));

  return result;
}

export const TimeSpanType = constructSymbols(
  'UNKNOWN',
  'INITIALIZATION',
  'STARTING',
  'HANGING',
  'WORKING',
  'ENDING',
  'REST'
);

// Map should be used here later
//
// export const TIME_SPAN_TYPE_UNKNOWN = '';
// export const TIME_SPAN_TYPE_BEFORE = '';
// export const TIME_SPAN_TYPE_RUNNING = '';
// export const TIME_SPAN_TYPE_HANGING = '';
// export const TIME_SPAN_TYPE_AFTER = '';
// export const TIME_SPAN_TYPE_RESTING = '';
