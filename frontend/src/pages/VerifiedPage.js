import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

export class VerifiedPage extends Component {

  render() {

    const wellStyles = {maxWidth: '100%', margin: '0 auto 10px'};

    return (
      <div>
        <div className="jumbotron">
          <h1>Thank you!</h1>
        </div>
        <Alert bsStyle="success">
          <strong>Now you can login into app!</strong> Follow the link below!
        </Alert>
        <div className="well" style={wellStyles}>
          <Button bsStyle="primary" bsSize="large" block>Sign in!</Button>
        </div>
      </div>
    );
  }
}
