import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Form } from 'react-bootstrap';
import api from '../../api.js';

export class LoginComponent extends Component{
  constructor(props){
    super(props);

    this.state = {
      loginEmail : "",
      loginPassword : ""
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
      this.setState({loginEmail: event.target.value});
  }

  handlePasswordChange(event) {
        this.setState({loginPassword: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('--- submitted: ', event.target);
    console.log("email: ", this.state.loginEmail);
    console.log("pwd: ", this.state.loginPassword);

    var email = this.state.loginEmail;
    var pwd = this.state.loginPassword;

    if (pwd==="" || email===""){
      console.log("empty values");
      return;
    }

    api('')
    .then(function(response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    })
      .catch(function (error) {
        console.log("Errorx: ", error);
      });


  }

  createField(type, key, desc,) {
    switch (type) {
      case 'password':
      return (
        <FormControl type={type} name={key} placeholder={type} value={this.state.loginPassword} onChange={this.handlePasswordChange}/>
      );
      case 'email':
      return (
        <FormControl type={type} name={key} placeholder={type} value={this.state.loginEmail} onChange={this.handleEmailChange}/>
      );

      default:
        return;
    }
  }


  render(){
    const fields = [
      /*key, label, type, desc*/
      ['email', 'Email', 'email', ''],
      ['password', 'Password', 'password', '']
    ];


    return(
      <div className="login">
        <Form inline onSubmit={this.handleSubmit} >

        {fields.map(([key, label, type, desc]) => {

            return (
              <div key={key} className="login-form-element">
                <FormGroup key={key} controlId={key} >
{/*                 <ControlLabel>{label}</ControlLabel> */}
                  {' '}
                  {this.createField(type, key, desc)}
                  </FormGroup>
              </div>
            );
        })}

          <div className="login-form-element">
            <button type="submit" className="btn btn-default">Login</button>
          </div>
        </Form>
      </div>
    );
  }
}
