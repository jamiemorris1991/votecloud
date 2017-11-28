import React, { Component } from 'react';
import logo from './download.png';
import './App.css';

import Voter from './components/Voter';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
          <h1 className="App-title">We are London!</h1>
        </header>
        <Voter></Voter>
      </div>
    );
  }
}

export default App;
