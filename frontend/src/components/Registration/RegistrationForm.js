import React, { Component } from 'react';

import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
import { FormGroup, ControlLabel, FormControl, HelpBlock, OverlayTrigger,
  Popover } from 'react-bootstrap';


import 'react-day-picker/lib/style.css';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
};

export class RegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showOverlay: false,
      value: '',
      selectedDay: null,

      firstName: "",
      lastName: "",
      email: ""
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  input = null;
  daypicker = null;
  clickedInside = false;
  clickTimeout = null;

  handleContainerMouseDown() {
    this.clickedInside = true;
    // The input's onBlur method is called from a queue right after onMouseDown event.
    // setTimeout adds another callback in the queue, but is called later than onBlur event
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }

  handleInputFocus() {
    this.setState({
      showOverlay: true,
    });
  }

  handleInputBlur() {
    const showOverlay = this.clickedInside;

    this.setState({
      showOverlay,
    });

    // Force input's focus if blur event was caused by clicking on the calendar
    if (showOverlay) {
      this.input.focus();
    }
  }

  handleInputChange(e) {
    const { value } = e.target;
    const momentDay = moment(value, 'L', true);
    if (momentDay.isValid()) {
      this.setState({
        selectedDay: momentDay.toDate(),
        value,
      }, () => {
        this.daypicker.showMonth(this.state.selectedDay);
      });
    } else {
      this.setState({ value, selectedDay: null });
    }
  }


  handleDayClick(e, day) {
    this.setState({
      value: moment(day).format('L'),
      selectedDay: day,
      showOverlay: false,
    });
    this.input.blur();
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
          <div onMouseDown={ this.handleContainerMouseDown }>
            <input
              type="text"
              ref={ el => { this.input = el; } }
              placeholder="DD/MM/YYYY"
              className="form-control"
              value={ this.state.value }
              onChange={ this.handleInputChange }
              onFocus={ this.handleInputFocus }
              onBlur={ this.handleInputBlur }
            />
            { this.state.showOverlay &&
              <div style={ { position: 'relative' } }>
                <div style={ overlayStyle }>
                  <DayPicker
                    ref={ el => { this.daypicker = el; } }
                    onDayClick={ this.handleDayClick }
                    selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
                  />
                </div>
              </div>
            }
          </div>
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
