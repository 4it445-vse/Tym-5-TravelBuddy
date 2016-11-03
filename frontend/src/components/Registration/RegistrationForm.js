import React, { Component } from 'react';
import { DatePicker } from '../common/DatePicker/DatePicker.js';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, OverlayTrigger,
  Popover, Radio, ButtonGroup, Button } from 'react-bootstrap';

export class RegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clientErrors: {}
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
          <DatePicker type="birthdate"/>
        );

      case 'radio':
        return (
          <ButtonGroup block>
            {values.map((value) => {
              return (
                <Button type="button" onClick={this.onRadioClick.bind(this, value)} active={this.state.option === value}>{value}</Button>
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
      option: option
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('--- submitted: ', formData);

    const clientErrors = this.validateForm(formData);
    console.log('---clientErrors', clientErrors);
    this.setState({ clientErrors });

  }

  /*
   * Frontend validation
   */

   validateForm(formData) {

     const psw = formData.get('password');
     const psw2 = formData.get('password2');
     if (psw !== psw2) {
       return {
          password: "Passwords are not same!"
       };
     }

   }

  render() {

    const fields = [
      /*key, label, type, desc, array with possible choices*/
      ['firstName', 'First name', 'text', ''],
      ['lastName', 'Last name', 'text', ''],
      ['birthdate', 'Birthdate', 'date', ''],
      ['gender', 'Your sex', 'radio', '', ['Male', 'Female']],
      ['email', 'Your email', 'email', 'Will be used for login'],
      ['password', 'Password', 'password', 'At least 6 characters long'],
      ['password2', 'Re-enter your password', 'password']
    ];

    const { clientErrors } = this.state;
    // console.log('---error msg', clientErrors);

    return (
      <div className="register">
        <Form horizontal onSubmit={this.handleSubmit} className="form-horizontal">
          <div>
            {fields.map(([key, label, type, desc, values]) => {
                const clientErrorMsg = clientErrors[key] || [];
                console.log('---error msg', clientErrorMsg);
                return (
                  <FormGroup validationState={clientErrorMsg.length ? "error" : undefined} key={key} controlId={key}>
                    <ControlLabel>{label}</ControlLabel>
                    {this.createField(type, key, desc, values)}
                    <FormControl.Feedback />
                    <HelpBlock>{clientErrorMsg}</HelpBlock>
                  </FormGroup>
                );
            })}
          </div>
          <div>
            <Button type="submit" bsStyle="primary" bsSize="large" block>Register!</Button>
          </div>

        </Form>
      </div>
    );
  }
}
