import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { LoginComponentContainer } from '../components/LoginComponent/LoginComponent.js';

export class VerifiedPage extends Component {

  render() {

    return (
      <div id="main-wrapper" className="verified-page">
        <header>
            <div className="header-content">
              <div className="row">
                <div className="col-lg-8 col-lg-push-4">
                  <div className="header-content-inner">
                      <h1 id="homeHeading"><a href="/">Travel Buddy</a></h1>
                      <hr/>
                      <p>TravelBuddy helps travellers to connect with locals and provide them unique experience in discovering!</p>
                  </div>
                </div>
                <div className="col-lg-4 col-lg-pull-8">
                  {/* <Alert bsStyle="success">
                    <strong>Now you can login into app!</strong> Follow the link below!
                  </Alert> */}
                  <div className="bg-primary login">
                    <LoginComponentContainer/>
                  </div>
                </div>
              </div>
            </div>
        </header>
      </div>
    );
  }
}
