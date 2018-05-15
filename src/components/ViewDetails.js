import React from 'react';
import AddNote from './AddNote';
import 'bootstrap/dist/css/bootstrap.css';

//component to view cutomer details
class ViewDetails extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.Savehandler = this.Savehandler.bind(this);
    this.state = {
      editNote: false,
      btnaddnote: 'Add Note',
      data: this.props.selected
    };
  }
  Savehandler(newdata) {
    this.setState({ data: newdata });
  }
  componentWillReceiveProps(newprops) {
    this.setState({
      data: newprops.selected
    });
  }
  renderEditnote() {
    if (this.state.editNote) {
      return (
        <AddNote
          Savehandler={this.Savehandler}
          selected={this.state.data}
          db={this.props.db}
        />
      );
    }
  }
  renderNotes() {}
  handleAddNote() {
    if (this.state.editNote) {
      this.setState({ editNote: false, btnaddnote: 'Add Note' });
    } else {
      this.setState({ editNote: true, btnaddnote: 'Cancel' });
    }
  }
  render() {
    console.log(this.state.data);
    if (this.state.data !== undefined && this.state.data.notes !== undefined) {
      const listItems = (
        <div
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            display: 'block',
            marginBottom: '2%'
          }}
        >
          <h4
            style={{
              justifyContent: 'center',
              display: 'flex',
              fontWeight: 'bolder',
              margin: '5%'
            }}
          >
            Customer Details
          </h4>
          <li className="list-group-item" key={this.state.data.id}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              ID :
            </label>
            {this.state.data.id}
          </li>
          <li className="list-group-item" key={this.state.data.email}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              Email :
            </label>
            {this.state.data.email}
          </li>
          <li className="list-group-item" key={this.state.data.name}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              Name:
            </label>
            {this.state.data.name}
          </li>
          <li className="list-group-item" key={this.state.data.creation}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              Creation :
            </label>
            {this.state.data.creation}
          </li>
          <li className="list-group-item" key={this.state.data.statusl}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              Status :
            </label>

            {this.state.data.status}
          </li>
          {this.state.data.notes.map((d, i) => {
            return (
              <div>
                <li className="list-group-item" key={i}>
                  <label
                    style={{
                      justifyContent: 'center',
                      fontWeight: 'bolder'
                    }}
                  >
                    Note {i} :
                  </label>
                  {d}
                </li>
              </div>
            );
          })}
          <button
            style={{ marginTop: '2%' }}
            type="button"
            class="btn btn-secondary"
            onClick={this.handleAddNote.bind(this)}
          >
            {this.state.btnaddnote}
          </button>
          {this.renderEditnote()}
        </div>
      );

      return <div>{listItems}</div>;
    } else {
      return ' ';
    }
  }
}
export default ViewDetails;
