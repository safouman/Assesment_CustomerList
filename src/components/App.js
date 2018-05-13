import React from 'react';
import Customers from './Customers';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
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

        <Customers />
      </div>
    );
  }
}
export default App;
