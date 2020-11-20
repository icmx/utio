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
    this.type = SpanTypes.includes(type) ? type : undefined;
  }

  includes(point) {
    return this.start <= point && point <= this.end;
  }
}
