function constructSymbols(...items) {
  let result = Object.create(null);
  items.forEach((item) => (result[item] = Symbol(item)));

  return result;
}

export const TimeSpanType = constructSymbols(
  'INITIALIZATION',
  'STARTING',
  'HANGING',
  'WORKING',
  'ENDING',
  'REST'
);
