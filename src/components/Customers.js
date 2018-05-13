import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import customers from '../helpers/Data';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
const {
  Editors

} = require('react-data-grid-addons');
const {
  AutoComplete: AutoCompleteEditor,
} = Editors;


// options for status autocomplete editor
const priorities = [{
  id: 0,
  title: 'Prospective'
}, {
  id: 1,
  title: 'Non Active'
}, {
  id: 2,
  title: 'Current'
}];
const PrioritiesEditor = < AutoCompleteEditor options = {
  priorities
}
/>;

const {
  Toolbar,
  Data: {
    Selectors
  }
} = require('react-data-grid-addons');



class Customers extends React.Component {
    constructor(props, context) {
      super(props, context);
      this._columns = [{
          key: 'id',
          name: 'ID',
          width: 80
        },
        {
          key: 'email',
          name: 'Email',
          filterable: true,
          sortable: true
        },
        {
          key: 'name',
          name: 'Name',
          filterable: true,
          sortable: true
        },
        {
          key: 'creation',
          name: 'Creation ',
          filterable: true,
          sortable: true
        },
        {
          key: 'status',
          name: 'Status',
          filterable: true,
          sortable: true,
          editor: PrioritiesEditor

        },

        {
          key: 'notes',
          name: 'Notes',
          filterable: true,
          sortable: true
        }
      ];

      this.state = {
        rows: customers,
        filters: {},
        sortColumn: null,
        sortDirection: null
      };
    }

    getRandomDate = (start, end) => {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      ).toLocaleDateString();
    };

    createRows = numberOfRows => {
      let rows = [];
      for (let i = 1; i < numberOfRows; i++) {
        rows.push({
          id: i,
          name: 'Name ' + i,
          email: 'random@random.com',
          complete: Math.min(100, Math.round(Math.random() * 110)),
          creationDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
          status: ['Prospective', 'Current', 'Non Active'][
            Math.floor(Math.random() * 2 + 1)
          ],

          Notes: 'notes'
        });
      }
      return rows;
    };

    getRows = () => {
      return Selectors.getRows(this.state);
    };

    getSize = () => {
      return this.getRows().length;
    };

    rowGetter = rowIdx => {
      const rows = this.getRows();
      return rows[rowIdx];
    };

    handleGridSort = (sortColumn, sortDirection) => {
      this.setState({
        sortColumn: sortColumn,
        sortDirection: sortDirection
      });
    };

    handleFilterChange = filter => {
      let newFilters = Object.assign({}, this.state.filters);
      if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
      } else {
        delete newFilters[filter.column.key];
      }

      this.setState({
        filters: newFilters
      });
    };

    onClearFilters = () => {
      this.setState({
        filters: {}
      });
    };

    handleGridRowsUpdated = ({
      fromRow,
      toRow,
      updated
    }) => {
      let rows = this.state.rows.slice();

      for (let i = fromRow; i <= toRow; i++) {
        let rowToUpdate = rows[i];
        let updatedRow = update(rowToUpdate, {
          $merge: updated
        });
        rows[i] = updatedRow;
      }

      this.setState({
        rows
      });
    };
    render() {

        return ( < ReactDataGrid onGridSort = {
            this.handleGridSort
          }
          enableCellSelect = {
            true
          }
          columns = {
            this._columns
          }
          rowGetter = {
            this.rowGetter
          }
          rowsCount = {
            this.getSize()
          }
          minHeight = {
            500
          }
          toolbar = { < Toolbar enableFilter = {
              true
            }
            />}
            onAddFilter = {
              this.handleFilterChange
            }
            onClearFilters = {
              this.onClearFilters
            }
            onGridRowsUpdated = {
              this.handleGridRowsUpdated
            }
            />);
          }
        }
        export default Customers;