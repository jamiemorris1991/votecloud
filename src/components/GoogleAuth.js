import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';


export default class GoogleAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
      }
    };
    this.onSignIn = this.onSignIn.bind(this);
    this.signOut = this.signOut.bind(this);
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
      <Container className="userbar">
      <Row>
        <Col>
        <div id="g-signin2" data-onsuccess={this.onSignIn}></div>
        </Col>
        <Col>
          <span>Welcome {this.state.user.name}</span>
        </Col>
        <Col>
          <Button color="primary" onClick={this.signOut}>Logout</Button>
        </Col>
      </Row>

      </Container>
    )
  }

}