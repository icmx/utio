const perc = (part, total) => {
  if (part > total) {
    throw new Error(`incorrect: part === ${part} > total === ${total}!`);
  } else {
    return (100 * part) / total;
  }
};

export const BeltItemType = Object.freeze([
  'primary',
  'success',
  'warning',
  'failure',
  'comment',
  'unknown',
]);

export class BeltItem {
  constructor(value, max, type) {
    const itemElement = document.createElement('div');
    itemElement.className = `belt-item belt-item--${type}`;

    const valueElement = document.createElement('div');
    valueElement.className = `belt-item__value`;

    itemElement.appendChild(valueElement);

    this.itemElement = itemElement;
    this.valueElement = valueElement;

    this.value = value;
    this.max = max;
    this.type = type;
  }
}

export class Belt {
  static init(target, options) {
    const belt = new Belt();
    belt.init(target, options);

    return belt;
  }

  init(target, options) {
    this._element = target;
    this._max = options.max;
    this._beltItems = [];

    [...this._element.childNodes].forEach((node) => node.remove());

    options.items.forEach((item, index) => {
      const beltItem = new BeltItem(item.value, item.max);

      this._beltItems.push(beltItem);
      this._element.appendChild(beltItem.itemElement);

      this.setItemMax(index, item.max);
      this.setItemValue(index, item.value);
    });
  }

  getItemByIndex(itemIndex) {
    return this._beltItems[itemIndex];
  }

  setItemMax(itemIndex, value) {
    const beltItem = this.getItemByIndex(itemIndex);
    beltItem.max = value;

    beltItem.itemElement.style.width = `${perc(value, this._max)}%`;
  }

  setItemValue(itemIndex, value) {
    const beltItem = this.getItemByIndex(itemIndex);
    beltItem.value = value;

    beltItem.valueElement.style.width = `${perc(value, beltItem.max)}%`;
  }

  setItemType(itemIndex, value) {
    const beltItem = this.getItemByIndex(itemIndex);
    beltItem.type = value;

    beltItem.itemElement.className = `belt-item belt-item--${value}`;
  }

  setValue(value) {
    this._beltItems.forEach((item, index) => {
      value = value - item.max;

      this.setItemValue(index, value > 0 ? item.max : item.max + value);
    });
  }

  setType(value) {
    this._beltItems.forEach((item, index) => {
      this.setItemType(index, value);
    });
  }
}
