import React, { Component } from 'react';

export class RegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('--- submitted: ', event.target);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <div className="control-group">
            <div><label htmlFor="firstName">First Name</label></div>
            <div className="controls">
              <input type="text" name="firstName" id="firstName" className="input" onChange={e => this.setState({"firstName": e.target.value})} placeholder="Rocky" />
              <p className="help-block"></p>
            </div>
          </div>
          <div className="control-group">
            <div><label htmlFor="lastName">Last Name</label></div>
            <div className="controls">
              <input type="text" name="lastName" id="lastName" onChange={e => this.setState({"lastName": e.target.value})} placeholder="Balboa" />
            </div>
          </div>
          <div className="control-group">
            <div><label htmlFor="email">Your email</label></div>
            <input type="email" name="email" id="email" onChange={e => this.setState({"email": e.target.value})} placeholder="example@example.com" />
            <p className="help-block">Enter valid email address.</p>
          </div>
          <div className="control-group">
            <div><label htmlFor="password">Password</label></div>
            <input type="password" name="email" id="password" />
            <p className="help-block">Should be at least 8 characters long</p>
          </div>
          <div className="control-group">
            <div><label htmlFor="passwordAgain">Re-enter pasword</label></div>
            <input type="password" name="email" id="passwordAgain" />
          </div>
          <div>
            <button className="btn" type="submit">Register!</button>
          </div>
        </form>
      </div>
    );
  }
}
