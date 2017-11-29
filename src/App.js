import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import logo from './download.png';
import './App.css';

import Voter from './components/Voter';
import Cloud from './components/Cloud';
import Form from './components/VoteForm';

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
        <Router>
          <div>
          <Navbar color="grey" light expand="md">
            <NavbarBrand href="/">reactstrap</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/">Cloud </Link>
                </NavItem>
                <NavItem>
                  <Link to="/vote">Vote Now!</Link>
                </NavItem>
                {/* <NavItem>
                  <Link to="/form">New Vote</Link>
                </NavItem> */}
              </Nav>
           </Navbar>
            <ul>
              <li></li>
            </ul>
            <hr />
            <Route exact path="/" component={Cloud} />
            <Route path="/vote" component={Voter} />
            <Route path="/form" component={Form} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
