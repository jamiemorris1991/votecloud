import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

import logo from './download.png';
import './App.css';

import Voter from './components/Voter';
import Cloud from './components/Cloud';
import Admin from './components/Admin';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
          <h1 className="App-title">We are London!</h1>
        </header>
          <div>
          <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">Vote Cloud</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem><Link to="/">Cloud </Link></NavItem>
                <NavItem><Link to="/vote">Vote Now!</Link></NavItem>
                <NavItem><Link to="/Admin">Admin</Link></NavItem>
              </Nav>
             </Collapse>
           </Navbar>
            <hr />
            <Route exact path="/" component={Cloud} />
            <Route path="/vote" component={Voter} />
            <Route path="/admin" component={Admin} />
          </div>
      </div>
    );
  }
}

export default App;
