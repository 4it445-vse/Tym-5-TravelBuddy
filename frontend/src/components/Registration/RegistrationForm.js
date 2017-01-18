import React, { Component } from 'react';
import { DatePicker } from '../common/DatePicker/DatePicker.js';
import { SubmitButton } from '../common/SubmitButton.js';
import { FormGroup, ControlLabel, FormControl, HelpBlock, OverlayTrigger,
  Popover, ButtonGroup, Button, Alert, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router';

import api from '../../api.js';

export class RegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      //birthdate is reffered from Daypicker component and fetched into formData
      //on submit, so it is not actually setting state on onChange event.
      //So that means this property is not neccessary
      birthdate: '',
      gender: '',
      email: '',
      password: '',
      password2: '',
      agreeToTerms: false,

      clientErrors: {},
      errors: {},

      isLoading: false,
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
            ref={(form) => { this._form = form; }}
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

      case 'checkbox-terms':
        return (
          <Checkbox name={key} onChange={this.setAgreeOnTerms}>I agree with <strong><Link to="/terms">terms of service</Link></strong></Checkbox>
        );

      default:
        return {};
    }
  }

  showAlert(type) {
    return (
      <div className="container">
          <Alert bsStyle={type}>
            <strong>Thank you for registering!</strong> Now visit your email inbox and proceed with verification link!
          </Alert>
      </div>
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

    this.setState({ isLoading: true });

    //TODO workaround for backend, if date is not date send dummy date to tell
    // backend that date is wrong
    let birthdate = this._form.getFormData().selectedDay;
    if (!birthdate || !Date.parse(birthdate)) {
      birthdate = "01-01-1001";
    }

    let formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthdate: birthdate,
      gender: this.state.gender,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      agreeToTerms: this.state.agreeToTerms
    }

    api.post('UserMain/submit', formData)
    .then(response => {
      // console.log('--- post usermain ok');
      this.setState({ clientErrors: {} });
      this.setState({ errors: {} });
      this.setState({ formSuccess: true });
      this.setState({ isLoading: false });
    })
    .catch(error => {
      const { response } = error;
      const { errors } = response.data.error.details;
      if (errors.password) {
        Object.assign(errors, {"password2": true});
      }
      this.setState({ errors });
      this.setState({ isLoading: false });
      console.log('--- submit usermain failed');
    });

  }

  render() {
    let cssClass = "form-themed";
    const fields = [
      /*key, label, type, desc, array with possible choices*/
      ['firstName', 'First name', 'text', ''],
      ['lastName', 'Last name', 'text', ''],
      ['birthdate', 'Birthdate', 'date', ''],
      ['gender', 'Your gender', 'radio-gender', '', ['Male', 'Female']],
      ['email', 'Your email', 'text', 'Enter valid email. You will use it for login and password reset'],
      ['password', 'Password', 'password', 'At least 6 characters long'],
      ['password2', 'Re-enter your password', 'password'],
      ['agreeToTerms', '', 'checkbox-terms', '']
    ];

    const { clientErrors } = this.state;
    const { errors } = this.state;
    const { isLoading } = this.state;

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
                    <FormGroup validationState={isValid ? undefined : "error" } key={key} controlId={key} className={cssClass}>
                      <ControlLabel>{label}</ControlLabel>
                      {this.createField(type, key, desc, values)}
                      <FormControl.Feedback />
                      <HelpBlock>{errorMsg === "can't be blank" ? "Required!" : errorMsg}</HelpBlock>
                    </FormGroup>
                  );
              })}
              <SubmitButton name="Register!" isLoading={isLoading} bsStyle="primary" bsSize="large" block/>
          </form>
        </div>
      );
    }
  }
}
