import React, { Component } from 'react';
import { DatePicker } from '../common/DatePicker/DatePicker.js';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, OverlayTrigger,
  Popover, ButtonGroup, Button } from 'react-bootstrap';

export class RegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clientErrors: {},
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
            <FormControl type={type} name={key} />
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
          <DatePicker type="birthdate" name="birthdate"/>
        );

      case 'radio':
        return (
          <ButtonGroup>
            {values.map((value) => {
              return (
                <Button key={value} type="button" onClick={this.onRadioClick.bind(this, value)} active={this.state.option === value}>{value}</Button>
              );
            })}
          </ButtonGroup>
        );

      default:
        return {};
    }
  }

  onRadioClick(option) {
    this.setState({
      gender: option
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('gender', this.state.gender);
    // console.log('--- submitted: ', formData);
    var clientErrors = this.validateForm(formData);
    // console.log('---clientErrors', clientErrors);
    // console.log('---length', Object.keys(clientErrors).length);
    if (Object.keys(clientErrors).length === 0) {
      //Make api call
      console.log('---form valid!');
      clientErrors = {};
      this.setState({ clientErrors });
    }
    else {
      this.setState({ clientErrors });
    }
  }

  /*
   * Frontend validation
   */

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
    // console.log('---client errors', clientErrors);

    return (
      <div className="register">
        <Form horizontal onSubmit={this.handleSubmit} className="form-horizontal">

            {fields.map(([key, label, type, desc, values]) => {
                const clientErrorMsg = clientErrors[key] || [];
                // console.log('---error msg', clientErrorMsg);
                return (
                  <FormGroup validationState={clientErrorMsg.length ? "error" : undefined} key={key} controlId={key}>
                    <ControlLabel>{label}</ControlLabel>
                    {this.createField(type, key, desc, values)}
                    <FormControl.Feedback />
                    <HelpBlock>{clientErrorMsg}</HelpBlock>
                  </FormGroup>
                );
            })}

            <Button type="submit" bsStyle="primary" bsSize="large" block>Register!</Button>


        </Form>
      </div>
    );
  }
}
