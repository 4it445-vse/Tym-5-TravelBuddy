import React, { Component } from 'react';
import { DatePicker } from '../common/DatePicker/DatePicker.js';
import { FormGroup, ControlLabel, FormControl, HelpBlock, OverlayTrigger,
  Popover } from 'react-bootstrap';

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
          <DatePicker type="yearNavigation"/>
        );

      case 'radio':
        return (
          <div>
            {values.map((value) => {
              return (
                <label key={value}>
                  <input type="radio" name={key}/>{value}
                </label>
              );
            })}
          </div>
        );
      default:
        return;

    }
  }

/*
 * Frontend validation
 */

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



    return (
      <div className="register">
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <div>
            {fields.map(([key, label, type, desc, values]) => {


                return (
                  <FormGroup key={key} controlId={key}>
                    <ControlLabel>{label}</ControlLabel>
                    {this.createField(type, key, desc, values)}
                    <HelpBlock>helper text</HelpBlock>
                  </FormGroup>
                );


            })}
          </div>
          <div>
            <button className="btn" type="submit">Register!</button>
          </div>

        </form>
      </div>
    );
  }
}
