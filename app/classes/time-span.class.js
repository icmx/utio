export class TimeSpan {
  constructor(name, start, end, type) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.type = type;
  }

  includes(value) {
    return this.start <= value && value <= this.end;
  }
}
