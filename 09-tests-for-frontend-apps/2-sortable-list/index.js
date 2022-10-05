export default class SortableList {
  element;

  constructor({items = []} = {}) {
    this.items = items;

    this.render();
  }

  render() {
    this.element = document.createElement('ul');
    this.element.className = 'sortable-list';

    this.addItems();
    this.initEventListeners();
  }

  onPointerMove = ({clientX, clientY}) => {
    this.moveDraggingAt(clientX, clientY);

    const {firstElementChild, children} = this.element;
    const topElement = firstElementChild.getBoundingClientRect();
    const bottomElement = this.element.getBoundingClientRect();

    if (clientY < topElement) {
      this.movePlaceholder(0);
    } else if (clientY > bottomElement) {
      this.movePlaceholder(children.length);
    } else {
      for (let i = 0; i < children.length; i++) {
        const li = children[i];

        if (li !== this.draggingElem) {
          const {top, bottom} = li.getBoundingClientRect();
          const {offsetHeight: height} = li;

          if (clientY > top && clientY < bottom) {
            if (clientY < top + height / 2) {
              this.movePlaceholder(i);
              break;
            } else {
              this.movePlaceholder(i + 1);
              break;
            }
          }
        }
      }
    }

    this.scrolling(clientY);
  };

  initEventListeners() {
    this.element.addEventListener('pointerdown', event => this.onPointerDown(event));
  }

  addItems() {
    for (let item of this.items) {
      item.classList.add('sortable-list__item');
    }

    this.element.append(...this.items);
  }

  onPointerDown(event) {
    if (event.which !== 1) {
      return false;
    }

    const itemElem = event.target.closest('.sortable-list__item');

    if (itemElem) {
      if (event.target.closest('[data-grab-handle]')) {
        event.preventDefault();

        this.dragStart(itemElem, event);
      }

      if (event.target.closest('[data-delete-handle]')) {
        event.preventDefault();

        itemElem.remove();
      }
    }
  }

  dragStart(itemElem, {clientX, clientY}) {
    this.elemInitialIndex = [...this.element.children].indexOf(itemElem);

    this.pointerInitialShift = {
      x: clientX - itemElem.getBoundingClientRect().x,
      y: clientY - itemElem.getBoundingClientRect().y
    };

    this.draggingElem = itemElem;

    this.placeholderElem = document.createElement('li');
    this.placeholderElem.className = 'sortable-list__placeholder';

    itemElem.style.width = `${itemElem.offsetWidth}px`;
    itemElem.style.height = `${itemElem.offsetHeight}px`;

    this.placeholderElem.style.width = itemElem.style.width;
    this.placeholderElem.style.height = itemElem.style.height;

    itemElem.classList.add('sortable-list__item_dragging');

    itemElem.after(this.placeholderElem);

    this.element.append(itemElem);

    this.moveDraggingAt(clientX, clientY);

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.dragStop);
  }

  moveDraggingAt(clientX, clientY) {
    this.draggingElem.style.left = clientX - this.pointerInitialShift.x + 'px';
    this.draggingElem.style.top = clientY - this.pointerInitialShift.y + 'px';
  }

  scrolling(clientY) {
    const scrollingValue = 10;
    const threshold = 20;

    if (clientY < threshold) {
      window.scrollBy(0, -scrollingValue);
    } else if (clientY > document.documentElement.clientHeight - threshold) {
      window.scrollBy(0, scrollingValue);
    }
  }

  movePlaceholder(index) {
    const currentElement = this.element.children[index];

    if (currentElement !== this.placeholderElem) {
      this.element.insertBefore(this.placeholderElem, currentElement);
    }
  }

  dragStop = () => {
    const placeholderIndex = [...this.element.children].indexOf(this.placeholderElem);

    this.placeholderElem.replaceWith(this.draggingElem);
    this.draggingElem.classList.remove('sortable-list__item_dragging');

    this.draggingElem.style.left = '';
    this.draggingElem.style.top = '';
    this.draggingElem.style.width = '';
    this.draggingElem.style.height = '';

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.dragStop);

    this.draggingElem = null;

    if (placeholderIndex !== this.elemInitialIndex) {
      this.element.dispatchEvent(new CustomEvent('sortable-list-reorder', {
        bubbles: true,
        details: {
          from: this.elemInitialIndex,
          to: placeholderIndex
        }
      }));
    }
  }

  remove() {
    this.element.remove();
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.dragStop);
  }

  destroy() {
    this.remove();
  }
}
