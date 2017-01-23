import React, { Component } from 'react';
import { FormGroup, FormControl, Form, Overlay, Popover } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {loginAction} from "../../actions/index.js";
import { connect } from 'react-redux';
//import {bindActionCreators} from "redux"
//import { browserHistory } from 'react-router';

export class LoginComponent extends Component{
  constructor(props){
    super(props);

    this.state = {
      loginEmail : "",
      loginPassword : "",
      callout : " ",
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

    var email = this.state.loginEmail;
    var pwd = this.state.loginPassword;

    this.props.dispatch(loginAction(email,pwd));
    this.setState({loginPassword : ""});
  }


  createField(type, key, desc,) {
    switch (type) {
      case 'password':

      return (
        <div>
        <FormControl type={type} name={key} ref='passwordTarget' placeholder={type} value={this.state.loginPassword} onChange={this.handlePasswordChange}/>
        </div>
      );
      case 'email':
      return (
        <div>
        <FormControl type={type} name={key} ref='emailTarget' placeholder={type} value={this.state.loginEmail} onChange={this.handleEmailChange}/>
        </div>
      );

      default:
        return;
    }
  }


  render(){
    let cssClass = "form-themed";
    const fields = [
      /*key, label, type, desc*/
      ['email', 'Email', 'email', ''],
      ['password', 'Password', 'password', '']
    ];

    return(
    <div>

        <Form inline onSubmit={this.handleSubmit} >

        {fields.map(([key, label, type, desc]) => {

            return (
              <div key={key} className="login-form-element">
                <FormGroup className={cssClass} key={key} controlId={key} >
                {/* <ControlLabel>{label}</ControlLabel> */}
                  {' '}
                  {this.createField(type, key, desc)}
                  </FormGroup>
              </div>
            );
        })}

          <div className="login-form-element">
            <button type="submit" ref="submitTarget" className="btn btn-default">Login</button>

            <Overlay
              show={this.props.statusText ? true:false}//{this.state.show}
              target={ () => ReactDOM.findDOMNode(this.refs.submitTarget)}
              placement="bottom"
              containerPadding={0}            >
              <Popover id="popover-contained">
                {this.props.statusText ? this.props.statusText : ""}
              </Popover>
            </Overlay>

          </div>
        </Form>
      <div className="login-form-element"> {this.state.callout} </div>
  </div>
    );
  }
}

//---Mapping functions and React-redux connection

const mapStateToProps = (state) => {

  return {
    statusText: state.authentificationReducer.statusText
  };
}
/*
const mapDispatchToProps = (dispatch) => {
  return {

  };
}
*/
export const LoginComponentContainer = connect(
  mapStateToProps //,
  //mapDispatchToProps
)(LoginComponent);
