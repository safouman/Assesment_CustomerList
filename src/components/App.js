import React from 'react';
import Customers from './Customers';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase';
import { DB_CONFIG } from '../helpers/Config';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child('customers');
    this.state = {
      data: {}
    };
  }
  componentDidMount() {
    this.database.on('value', snap => {
      this.setState({
        data: snap.val()
      });
    });
  }
  render() {
    return (
      <div
        style={{
          display: 'block',
          justifyContent: 'center',
          margin: '5%'
        }}
      >
        <h1
          style={{
            justifyContent: 'center',
            display: 'flex',
            fontWeight: 'bolder',
            marginBottom: '5%'
          }}
        >
          Propellerhead
        </h1>
        {this.state.data[0] ? (
          <Customers data={this.state.data} db={this.database} />
        ) : (
          <h2
            style={{
              justifyContent: 'center',
              display: 'flex',
              fontWeight: 'bolder',
              marginBottom: '5%'
            }}
          >
            Loading ..
          </h2>
        )}
      </div>
    );
  }
}
export default App;
