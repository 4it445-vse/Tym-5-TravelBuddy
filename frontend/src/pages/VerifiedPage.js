import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { LoginComponentContainer } from '../components/LoginComponent/LoginComponent.js';

export class VerifiedPage extends Component {

  render() {

    const wellStyles = {maxWidth: '100%', margin: '0 auto 10px'};

    return (
      <div id="main-wrapper" class="verified-page">
        <header>
            <div className="header-content">
              <div className="row">
                <div className="col-lg-4">
                  <Alert bsStyle="success">
                    <strong>Now you can login into app!</strong> Follow the link below!
                  </Alert>
                  <div className="well bg-primary login" style={wellStyles}>
                    <LoginComponentContainer/>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="header-content-inner">
                      <h1 id="homeHeading">Travel Buddy</h1>
                      <hr/>
                      <p>TravelBuddy helps travellers to connect with locals and provide them unique experience in discovering!</p>
                  </div>
                </div>
              </div>
            </div>
        </header>
      </div>
    );
  }
}
