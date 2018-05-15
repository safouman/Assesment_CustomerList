import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';
import ViewDetails from './ViewDetails';
const { Editors } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor } = Editors;

// options for status autocomplete editor
const priorities = [
  {
    id: 0,
    title: 'Prospective'
  },
  {
    id: 1,
    title: 'Non Active'
  },
  {
    id: 2,
    title: 'Current'
  }
];
const PrioritiesEditor = <AutoCompleteEditor options={priorities} />;

const {
  Toolbar,
  Data: { Selectors }
} = require('react-data-grid-addons');

// component to render cutomers list
class Customers extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
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
      rows: this.props.data,
      filters: {},
      sortColumn: null,
      sortDirection: null,
      selectedIndexes: '',
      selectedRow: {}
    };
  }

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

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {
        $merge: updated
      });
      rows[i] = updatedRow;
      console.log(updatedRow.id);
      this.props.db.child(updatedRow.id - 1).update({
        status: updatedRow.status
      });
    }
    //make changes to state
    this.setState({
      rows
    });
    //make changes to db
  }

  onRowsSelected(rows) {
    this.setState({
      selectedIndexes: rows.map(r => r.rowIdx),
      selectedRow: rows.map(r => r.row)
    });
  }

  onRowsDeselected(rows) {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
      selectedRow: {},
      selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
      )
    });
  }
  render() {
    return (
      <div>
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect={true}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          minHeight={500}
          toolbar={<Toolbar enableFilter={true} />}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters}
          onGridRowsUpdated={this.handleGridRowsUpdated.bind(this)}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: false,
            onRowsSelected: this.onRowsSelected.bind(this),
            onRowsDeselected: this.onRowsDeselected.bind(this),
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}
        />
        <ViewDetails selected={this.state.selectedRow[0]} db={this.props.db} />
      </div>
    );
  }
}
export default Customers;
