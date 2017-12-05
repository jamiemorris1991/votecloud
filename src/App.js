import React, { Component } from 'react';
import {Route, NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';
import Responsive from 'react-responsive';

import logo from './logo.svg';
import './App.css';

import Voter from './components/Voter';
import Cloud from './components/Cloud';
import Admin from './components/Admin';

const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
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

        </header>
        <Desktop>
          <Container>
            <Navbar color="faded" light>
                  <Nav>
                    <NavItem><NavLink to="/vote" tag={RRNavLink}>Vote</NavLink></NavItem>
                    <NavItem><NavLink to="/cloud" tag={RRNavLink}>Cloud </NavLink></NavItem>
                    <NavItem><NavLink to="/Admin" tag={RRNavLink}>Admin</NavLink></NavItem>
                  </Nav>
              </Navbar>
              <hr/>
            </Container>
          </Desktop>
            <Route exact path="/" component={Voter} />
            <Route path="/cloud" component={Cloud} />
            <Route path="/vote" component={Voter} />
            <Route path="/admin" component={Admin} />
      </div>
    );
  }
}

export default App;
