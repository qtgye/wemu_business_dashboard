import Component from './component.js';

class Table extends Component {
  constructor(element) {
    super(element);

    this.tableBody = element.querySelector('tbody');
    [...this.columnheaders] = element.querySelectorAll('.table__columnheader');
    [...this.tableRows] = element.querySelectorAll('.table__row');

    // Should store collected headers data
    this.headers = [];

    // Should store collected rows data
    this.rows = [];
  }

  /**
   * Collects headers data
   */
  collectHeadersData() {
    this.columnheaders.forEach(header => {
      const sortable = header.hasAttribute('data-sortable');

      this.headers.push({
        sortable,
        element: header,
        name: header.dataset.prop,
        title: header.dataset.title
      });

      if ( sortable  ) {
        header.addEventListener('click', e => this.sortByColumn(header.dataset.prop));
      }
    });
  }

  /**
   * Collects rows data from the queried row elements
   */
  collectRowsData() {
    this.tableRows.forEach(row => {
      const [...cells] = row.querySelectorAll('[data-prop]');
      const data = cells.reduce((obj, cell) => {
        obj[cell.dataset.prop] = cell.dataset.value;
        return obj;
      }, {});

      // Append row data
      this.rows.push({
        element: row,
        data,
      });
    });
  }

  sortByColumn(columnName) {
    const columnHeaderData = this.headers.find(({ name  }) => name === columnName);

    if ( !columnHeaderData  ) {
      return;
    }

    // Check if currently ascending
    const isAscending = columnHeaderData.element.hasAttribute('data-ascending');

    // Should sort rows here
    // Sort direction should be inverse of the current direction
    // i.e., if isAscending, sort in descending manner, and vice versa
    this.rows
      // Sort data
      .sort((rowA, rowB) => {
        return isAscending ?
          ( rowA.data[columnName] > rowB.data[columnName] ? -1 : 1 ):
          ( rowA.data[columnName] < rowB.data[columnName] ? -1 : 1 );
      })
      // Update DOM
      .forEach(({ element, data }) => {
        this.tableBody.appendChild(element);
      });

    // Update columnheader attribute
    columnHeaderData.element[ isAscending ? 'removeAttribute' : 'setAttribute' ]('data-ascending', '');
  }

  init() {
    this.collectHeadersData();
    this.collectRowsData();
  }
}

Table.selector = '.table';

export default Table;
