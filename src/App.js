import React, { Component } from 'react';
import {Route, NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';
import Responsive from 'react-responsive';

import logo from './logo.svg';
import './App.css';

import Voter from './components/Voter';
import Cloud from './components/Cloud';
import Admin from './components/Admin';
import GoogleAuth from './components/GoogleAuth';

const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
class App extends Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      loggedIn: false,
      user: {}
    };
  }

  componentDidMount () {
    window.gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 150,
      'height': 40,
      'longtitle': false,
      'theme': 'light',
      'onsuccess': this.onSignIn
    });  
  }

  onSignIn(googleUser) {
    console.log("Foo");
    let profile = googleUser.getBasicProfile();
    sessionStorage.setItem('authToken', profile.getId());
    sessionStorage.setItem('name', profile.getName());
    sessionStorage.setItem('imageUrl', profile.getImageUrl());
    sessionStorage.setItem('email', profile.getEmail());
    
    this.setState({
      user: {
        name: profile.getName(),
        email: profile.getEmail
      }
    });
  }

  signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
      sessionStorage.clear();
      this.setState({user: {}});
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
          <GoogleAuth/>
          <Route exact path="/" component={Voter} />
          <Route path="/cloud" component={Cloud} />
          <Route path="/vote" component={Voter} />
          <Route path="/admin" component={Admin} />
      </div>
    );
  }
}

export default App;
