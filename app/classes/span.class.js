const makeMap = (...entries) => {
  const result = new Map();

  entries.forEach(([key, value]) => {
    result.set(key, value);
  });

  return result;
};

const SpanTypesAsBeltTypesMap = makeMap(
  ['before', 'success'],
  ['running', 'primary'],
  ['hanging', 'warning'],
  ['after', 'success'],
  ['rest', 'unknown']
);

export const SpanTypes = Object.freeze([
  'before',
  'running',
  'hanging',
  'after',
  'rest',
]);

export class Span {
  constructor(title, start, end, type) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.duration = this.end - this.start;
    this.type = SpanTypes.includes(type) ? type : undefined;
  }

  static rest = Object.freeze(new Span('Rest', undefined, undefined, 'rest'));

  static getBeltItemType(span) {
    return SpanTypesAsBeltTypesMap.get(span.type) ?? 'unknown';
  }

  includes(time) {
    return this.start <= time && time <= this.end;
  }
}
