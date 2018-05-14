import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

const data = [
  {
    id: 1,
    email: 'ewellstood0@prlog.org',
    name: 'Edie',
    creation: '6/13/2017',
    status: 'Current',
    notes: [
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.'
    ]
  }
];

class ViewDetails extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: {}
    };
  }

  render() {
    if (this.props.selected) {
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
          <li className="list-group-item" key={this.props.selected.id}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              ID :
            </label>
            {this.props.selected.id}
          </li>
          <li className="list-group-item" key={this.props.selected.email}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              Email :
            </label>
            {this.props.selected.email}
          </li>
          <li className="list-group-item" key={this.props.selected.name}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              Name:
            </label>
            {this.props.selected.name}
          </li>
          <li className="list-group-item" key={this.props.selected.creation}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              Creation :
            </label>
            {this.props.selected.creation}
          </li>
          <li className="list-group-item" key={this.props.selected.statusl}>
            <label
              style={{
                justifyContent: 'center',
                fontWeight: 'bolder'
              }}
            >
              Status :
            </label>
            {this.props.selected.status}
          </li>
          {this.props.selected.notes.map((d, i) => {
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
        </div>
      );
      console.log(this.props.selected.notes);
      return <div>{listItems}</div>;
    }
    return '';
  }
}
export default ViewDetails;
