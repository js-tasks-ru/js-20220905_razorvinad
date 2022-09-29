export default class SortableTable {
  element;
  subElements
    = {};

  onSortClick = event => {
    const column = event.target.closest('[data-sortable="true"]');

    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc'
      };

      return orders[order];
    };

    if (column) {
      const {id, order} = column.dataset;
      const newOrder = toggleOrder(order);
      const sortedData = this.sortData(id, newOrder);
      const arrow = column.querySelector('.sortable-table__sort-arrow');

      column.dataset.order = newOrder;

      if (!arrow) {
        column.append(this.subElements.arrow);
      }

      this.subElements.body.innerHTML = this.getTableRows(sortedData);
    }
  }
  constructor(headersConfig, {
    data = [],
    sorted = {
      id: headersConfig.find(item => item.sortable).id,
      order: 'asc'
    }
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;

    this.render();
  }

  getTable(data) {
    return `
      <div class="sortable-table">
          ${this.getTableHeader()}
          ${this.getTableBody(data)}
      </div>
    `;
  }

  getTableHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
                ${this.headersConfig.map(item => this.getHeaderRow(item)).join('')}
            </div>`;
  }

  getTableBody(data) {
    return `<div data-element="body" class="sortable-table__body">
        ${this.getTableRows(data)}
    </div>`;
  }

  getTableRows(data) {
    return data.map(item => `
        <div class="sortable-table__row">
            ${this.getTableRow(item)}
        </div>`
    ).join('');
  }

  getTableRow(item) {
    const cells = this.headersConfig.map(({id, template}) => {
      return {
        id, template
      };
    });

    return cells.map(({id, template}) => {
      return template ? template(item[id]) :
        `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  getHeaderRow({id, title, sortable}) {
    const order = this.sorted.id === id ? this.sorted.order : 'asc';

    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
           <span>${title}</span>
           ${this.getHeaderSortingArrow(id)}
      </div>`;
  }
  getHeaderSortingArrow(id) {
    const isOrderExist = this.sorted.id === id ? this.sorted.order : '';

    return isOrderExist ?
      `<span data-element="arrow" class="sortable-table__sort-arrow">
         <span class="sort-arrow"></span>
      </span>`
      : '';
  }

  getElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const innerElement of elements) {
      const name = innerElement.dataset.element;

      result[name] = innerElement;
    }

    return result;
  }

  render() {
    const {id, order} = this.sorted;
    const wrapper = document.createElement('div');
    const sortedData = this.sortData(id, order);

    wrapper.innerHTML = this.getTable(sortedData);

    this.element = wrapper.firstElementChild;
    this.subElements = this.getElements(this.element);

    this.initEventListeners();
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onSortClick);
  }

  sort(field, order) {

    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll(`.sortable-table__cell[data-id]`);
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;
    this.subElements.body.innerHTML = this.getTableRows(sortedData);
  }

  sortData(id, order) {
    const arr = [...this.data];
    const column = this.headersConfig.find(item => item.id === id);
    const {sortType, customSorting} = column;
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[id] - b[id]);
      case 'string':
        return direction * (a[id].localeCompare(b[id], ['ru', 'en']));
      default:
        return direction * (a[id] - b[id]);
      }
    });
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }

}
