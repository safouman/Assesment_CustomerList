import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
//  adding new note to a customer

class AddNote extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      note: ''
    };
  }
  handleSaveNote() {
    this.props.selected.notes.push(this.state.note);

    this.DbSave(this.props.selected);
    // this.props.Savehandler(this.props.selected);
    this.setState({ note: '' });
  }

  handlechange(e) {
    this.setState({
      note: e.target.value
    });
  }

  DbSave(updated) {
    this.props.db.child(updated.id - 1).update({
      notes: updated.notes
    });
  }

  render() {
    return (
      <div style={{ margin: '2%' }} class="form-group">
        <label for="newnote">
          <h4>New Note</h4>
        </label>
        <textarea
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%'
          }}
          class="form-control"
          id="new_note"
          rows="3"
          value={this.state.note}
          onChange={this.handlechange.bind(this)}
        />
        <button
          style={{ marginTop: '2%' }}
          type="button"
          class="btn btn-secondary"
          onClick={this.handleSaveNote.bind(this)}
        >
          Save
        </button>
      </div>
    );
  }
}

export default AddNote;
