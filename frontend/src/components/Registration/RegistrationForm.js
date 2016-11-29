import React, { Component } from 'react';
import { DatePicker } from '../common/DatePicker/DatePicker.js';
import { FormGroup, ControlLabel, FormControl, HelpBlock, OverlayTrigger,
  Popover, ButtonGroup, Button, Alert, Checkbox } from 'react-bootstrap';
// import moment from 'moment';
import { Link } from 'react-router';

import api from '../../api.js';

export class RegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      birthdate: '',
      gender: '',
      email: '',
      password: '',
      password2: '',
      agreeToTerms: false,

      clientErrors: {},
      errors: {},

      formSuccess: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAgreeOnTerms = this.setAgreeOnTerms.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  createPopover(text) {
    if (!text) {
      return;
    }
    return (
      <Popover id="popover-trigger-focus" title="">
        {text}
      </Popover>
    );
  }

  createField(type, key, desc, values) {
    switch (type) {
      case 'text':
      case 'password':
      case 'email':
        if (!desc) {
          return (
            <FormControl
              type={type}
              name={key}
              onChange={this.handleInputChange}
            />
          );
        }
         else {
          const popover = this.createPopover(desc);
          return (
            <OverlayTrigger trigger="focus" placement="right" overlay={popover} delay={100}>
              <FormControl type={type} name={key} onChange={this.handleInputChange}/>
            </OverlayTrigger>
          );
        }

      case 'date':
        return (
          <DatePicker
            type="birthdate"
            name="birthdate"
            onChange={this.handleInputChange}
          />
        );

      case 'radio-gender':
        return (
          <ButtonGroup className="block">
            {values.map((value) => {
              return (
                <Button
                  key={value}
                  type="button"
                  onClick={this.setGender.bind(this, value)}
                  active={this.state.gender === value}
                >
                  {value}
                </Button>
              );
            })}
          </ButtonGroup>
        );

      default:
        return {};
    }
  }

  showAlert(type) {
    return (
      <Alert bsStyle={type}>
        <strong>Thank you for registering!</strong> Now visit your email inbox and proceed with verification link!
      </Alert>
    );
  }

  setGender(value) {
    this.setState({
      gender: value
    });
  }

  setAgreeOnTerms(event) {
    if (!this.state.agreeToTerms) {
      this.setState({
        agreeToTerms: true
      });
    } else {
      this.setState({
        agreeToTerms: false
      });
    }
  }

  handleInputChange(event){
        this.setState({[event.target.name] : event.target.value});
        // console.log('--- state', this.state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let errors = {};

    let formData = new FormData(event.target);
    formData.append('gender', this.state.gender);

    if (!this.state.agreeToTerms) {
      errors['agreeToTerms'] = "You must agree to terms of service!";
      this.setState({ clientErrors: errors });
    } else {
      this.setState({ clientErrors: {} });
    }

    api.post('UserMain/submit', formData)
    .then(response => {
      console.log('--- post usermain ok');
      this.setState({ clientErrors: {} });
      this.setState({ errors: {} });
      this.setState({ formSuccess: true });
    })
    .catch(error => {
      const { response } = error;
      const { errors } = response.data.error.details;
      if (errors.password) {
        Object.assign(errors, {"password2": true});
      }
      this.setState({ errors });
      console.log('--- submit usermain failed', response);
    });
  }

  render() {
    const fields = [
      /*key, label, type, desc, array with possible choices*/
      ['firstName', 'First name', 'text', ''],
      ['lastName', 'Last name', 'text', ''],
      ['birthdate', 'Birthdate', 'date', ''],
      ['gender', 'Your gender', 'radio-gender', '', ['Male', 'Female']],
      ['email', 'Your email', 'text', 'Enter valid email. You will use it for login and password reset'],
      ['password', 'Password', 'password', 'At least 6 characters long'],
      ['password2', 'Re-enter your password', 'password']
    ];

    const { clientErrors } = this.state;
    const { errors } = this.state;

    // console.log('---backend errors', errors);

    if (this.state.formSuccess === true) {
      return this.showAlert('success');
    } else {
      return(
        <div className="register">
          <form  onSubmit={this.handleSubmit} className="form-horizontal">
              {fields.map(([key, label, type, desc, values]) => {
                  const clientErrorMsg = clientErrors[key] || [];
                  const errorMsg = errors[key] || [];
                  let isValid = false;
                  if (errorMsg.length || clientErrorMsg.length) {
                    isValid = false;
                  } else {
                    isValid = true;
                  }
                  if (errors[key] === true && key === "password2") {
                    isValid = false;
                  }
                  return (
                    <FormGroup validationState={isValid ? undefined : "error" } key={key} controlId={key}>
                      <ControlLabel>{label}</ControlLabel>
                      {this.createField(type, key, desc, values)}
                      <FormControl.Feedback />
                      <HelpBlock>{errorMsg == "can't be blank" ? "Required!" : errorMsg}</HelpBlock>
                    </FormGroup>
                  );
              })}
              <FormGroup validationState={this.state.agreeToTerms ? undefined : "error"}>
                <Checkbox onChange={this.setAgreeOnTerms}>I agree with <strong><Link to="/terms">terms of service</Link></strong></Checkbox>
                <HelpBlock>{clientErrors['agreeToTerms']}</HelpBlock>
              </FormGroup>
              <Button type="submit" bsStyle="primary" bsSize="large" block>Register!</Button>
          </form>
        </div>
      );
    }
  }
}
