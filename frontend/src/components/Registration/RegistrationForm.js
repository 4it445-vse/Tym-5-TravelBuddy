import React, { Component } from 'react';
import { DatePicker } from '../common/DatePicker/DatePicker.js';
import { FormGroup, ControlLabel, FormControl, HelpBlock, OverlayTrigger,
  Popover, ButtonGroup, Button, Alert } from 'react-bootstrap';
import moment from 'moment';

import api from '../../api.js';

export class RegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clientErrors: {},
      errors: {},
      formSuccess: false,
      gender: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
            />
          );
        }
         else {
          const popover = this.createPopover(desc);
          return (
            <OverlayTrigger trigger="focus" placement="right" overlay={popover} delay={100}>
              <FormControl type={type} name={key} />
            </OverlayTrigger>
          );
        }

      case 'date':
        return (
          <DatePicker
            type="birthdate"
            name="birthdate"
          />
        );

      case 'radio':
        return (
          <ButtonGroup className="block">
            {values.map((value) => {
              return (
                <Button
                  key={value}
                  type="button"
                  onClick={this.onRadioClick.bind(this, value)}
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

  onRadioClick(option) {
    this.setState({
      gender: option
    });
  }

  formDataToJSON(formData) {
    var json = {};
    for(var pair of formData.entries()) {
      if (pair[0] !== 'password2') {
        json[pair[0]] = pair[1];
      }
    }
    return json;
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append('gender', this.state.gender);

    var clientErrors = this.validateForm(formData);

    if (Object.keys(clientErrors).length === 0) {
      const params = this.formDataToJSON(formData);
      // console.log('---json formdata', params);

      api.post('usermain', params)
      .then(({ data }) => {
        // console.log('---data', data);
        this.setState({ clientErrors: {} });
        this.setState({formSuccess: true});
      })
      .catch(error => {
        // console.log('---response', error.response);
        const errors = error.response.data.error.details.messages;
        this.setState({ errors });
      });
      console.log('---form valid!');
      this.setState({ clientErrors: {} });
    }
    else {
      this.setState({ clientErrors });
    }
  }

  validateForm(formData) {
    var errors = {};

    for (var pair of formData.entries()) {
     if (!pair[1]) {
      errors[pair[0]] = "Required!";
     }
     if (pair[0] === 'email') {
       const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
       if (!emailPattern.test(pair[1])) {
         errors[pair[0]] = 'Enter a valid email';
       }
     }
     if (pair[0] === 'birthdate') {
       if (moment(pair[1]).isSameOrAfter(new Date(), 'day')) {
         errors[pair[0]] = 'Birthdate cannot be set in future!';
       }
     }
    }

    var psw = formData.get('password');
    var psw2 = formData.get('password2');
    if (psw !== psw2) {
     errors['password'] = "Passwords are not same!";
    }
    if (psw.length < 6) {
     errors['password'] = "Password is too short!"
    }
    return errors;
  }


  render() {
    const fields = [
      /*key, label, type, desc, array with possible choices*/
      ['firstName', 'First name', 'text', ''],
      ['lastName', 'Last name', 'text', ''],
      ['birthdate', 'Birthdate', 'date', ''],
      ['gender', 'Your gender', 'radio', '', ['Male', 'Female']],
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
                  var isValid = false;
                  if (errorMsg.length || clientErrorMsg.length) {
                    isValid = false;
                  } else {
                    isValid = true;
                  }
                  return (
                    <FormGroup validationState={isValid ? undefined : "error" } key={key} controlId={key}>
                      <ControlLabel>{label}</ControlLabel>
                      {this.createField(type, key, desc, values)}
                      <FormControl.Feedback />
                      <HelpBlock>{clientErrorMsg}{errorMsg}</HelpBlock>
                    </FormGroup>
                  );
              })}
              <Button type="submit" bsStyle="primary" bsSize="large" block>Register!</Button>
          </form>
        </div>
      );
    }
  }
}