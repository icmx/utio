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
