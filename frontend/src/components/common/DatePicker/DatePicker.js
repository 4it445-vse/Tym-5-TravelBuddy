import React, { Component } from 'react';

import DayPicker, { DateUtils } from 'react-day-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

const overlayStyle = {
  position: 'absolute',
  background: '#fff',
  border: 'solid 1px rgb(220,220,220)',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  zIndex: 9999
};

const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear - 100, 0, 1, 0, 0);
const toMonth = new Date();

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i++) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={ handleChange } value={ date.getMonth() }>
        { months.map((month, i) =>
          <option key={ i } value={ i }>
            { month }
          </option>)
        }
      </select>
      <select name="year" onChange={ handleChange } value={ date.getFullYear() }>
        { years.map((year, i) =>
          <option key={ i } value={ year }>
            { year }
          </option>)
        }
      </select>
    </form>
  );
}

export class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialMonth: toMonth,
      showOverlay: false,
      value: '',
      selectedDay: null,
      cssStyle: this.props.className || undefined
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);
    this.setDefaultValue = this.setDefaultValue.bind(this);

  }

  input = null;
  daypicker = null;
  clickedInside = false;
  clickTimeout = null;

  getFormData() {
    return {
      selectedDay: this.state.selectedDay,
      value: this.state.value
    };
  }

  handleContainerMouseDown() {
    this.clickedInside = true;
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

  setDefaultValue(dateDefault){
    var  dtDefaul = new Date (dateDefault);
    this.setState({
      value: moment(dtDefaul).format('L'),
      selectedDay: dtDefaul,
      showOverlay: false,
    });
      // console.log ('valueDefault', this.state.value);
      // console.log ('selectedDayDefault', this.state.selectedDay);
    this.input.blur();
  }

  handleDayClick(e, day) {
    // console.log ('dayDay', day);
    this.setState({
      value: moment(day).format('L'),
      selectedDay: day,
      showOverlay: false,
    });
    // console.log ('valueClick', this.state.value);
    // console.log ('selectedDayClick', this.state.selectedDay);
    this.input.blur();
  }

  render() {
    const { type } = this.props;
    const { name } = this.props;
    switch (type) {
      case 'birthdate':
        return (
          <div onMouseDown={ this.handleContainerMouseDown }>
            <input
              type="text"
              name={name}
              ref={ el => { this.input = el; } }
              placeholder="DD/MM/YYYY"
              className={'form-control ' +  this.state.cssStyle}
              value={ this.state.value }
              onChange={ this.handleInputChange }
              onFocus={ this.handleInputFocus }
              onBlur={ this.handleInputBlur }
            />
            { this.state.showOverlay &&
              <div style={ { position: 'relative' } } className="YearNavigation">
                <div style={ overlayStyle }>
                  <DayPicker
                    ref={ el => { this.daypicker = el; } }
                    onDayClick={ this.handleDayClick }
                    selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
                    initialMonth={ this.state.initialMonth }
                    fromMonth={ fromMonth }
                    toMonth={ toMonth }
                    captionElement={
                      <YearMonthForm onChange={ initialMonth => this.setState({ initialMonth }) } />
                    }
                  />
                </div>
              </div>
            }
          </div>
        );
      default:
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
    }

  }

}
