import React, { Component } from 'react';
//import { Link } from 'react-router';

import { RegistrationForm } from '../components/Registration/RegistrationForm.js';

export class RegistrationPage extends Component {

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>Registration</h1>
        </div>
        <RegistrationForm></RegistrationForm>
      </div>
    );
  }
}
