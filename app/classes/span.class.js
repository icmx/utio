const _makeSymbols = (...values) => {
  const result = Object.create(null);
  values.map((value) => (result[value] = Symbol(value.toLowerCase())));

  return result;
};

export class Span {
  constructor(title, start, end, type) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.type = type;
  }

  includes(point) {
    return this.start <= point && point <= this.end;
  }
}

export const SpanType = _makeSymbols(
  'BEFORE',
  'RUNNING',
  'HANGING',
  'AFTER',
  'NONE'
);
