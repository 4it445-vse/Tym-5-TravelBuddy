import React, { Component } from 'react';
import { Alert, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock,
  Glyphicon, Row, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import { SubmitButton } from '../../common/SubmitButton.js';
import { BookingWizardProgressBar } from './BookingWizardProgressBar.js';
import ReactDOM from 'react-dom';
import DayPicker, { DateUtils } from 'react-day-picker';
import { connect } from 'react-redux';
import { cancelBookingAction, createTransactionAction } from '../actions.js';
import { Link } from 'react-router';

import api from '../../../api.js';

const overlayStyle = {
  background: "rgba(0,0,0,0.6)"
}

export class BookingWizardRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      lastStep: 4,
      isLoading: false,

      //transaction data
      requestDate: undefined,
      selectedDay: new Date()
    }

    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.handleFirstStep = this.handleFirstStep.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
    this.createTransaction = this.createTransaction.bind(this);
  }

  prevStep() {
    if (this.state.currentStep !== 1) {
      this.setState({currentStep: this.state.currentStep - 1});
    }
  }

  nextStep() {
    if (this.state.currentStep !== this.state.lastStep) {
      this.setState({currentStep: this.state.currentStep + 1});
    }
  }

  handleFirstStep() {
    console.log('--- handleFirstStep', this.state.selectedDay);
    if (this.state.selectedDay) {
      this.setState({ requestDate: this.state.selectedDay});
      this.nextStep();
    } else {
    }
    // if (event.target.requestDate) {
    //   this.setState({ requestDate: event.target.requestDate});
    //   this.nextStep();
    // } else {
    //   console.log('NEIN');
    // }
  }

  handleDayClick(e, day, { disabled, selected }) {
    if (disabled) {
      return;
    }
    this.setState({ selectedDay: selected ? null : day });
    this.setState({ requestDate: selected ? null : day });
  }

  cancelBooking() {
    this.props.dispatch(cancelBookingAction());
  }

  createTransaction() {
    this.setState({ isLoading: true });
    this.props.dispatch(createTransactionAction(
      this.props.booking.product.id,
      this.props.booking.owner.id,
      localStorage.userId,
      this.state.requestDate
    ));
    this.nextStep();
  }

  componentDidMount() {

  }

  getOwnerProfilePictureStyle(filename) {
    let ownerPictureUrl = "/api/containers/profilePictures/download/" + filename;
    return {
      backgroundImage: "url(" + ownerPictureUrl + ")",
    }
  }

  getProductPictureStyle(filename) {
    let productImageUrl = "/api/containers/productPictures/download/" + filename;
    return {
      backgroundImage: "url(" + productImageUrl + ")",
    }
  }

  showProductDetail(product, owner) {
    return (
      <div className="detail-product">
        <div className="header" style={this.getProductPictureStyle(product.picture)}>
          <h4>{product.label}</h4>
        </div>
        <div className="body">
          <div className="info-bar">
            <div className="profile-picture" style={this.getOwnerProfilePictureStyle(owner.profilePicture)}></div>
            <span className="name">
              {`${owner.firstName} ${owner.lastName}`}
            </span>
            <span className="city">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              &nbsp;
              {product.city.name}
            </span>
            {product.categories.name ?
              <span className="category">
                {product.categories.name}
              </span>
              :
              undefined}
            <span className="price">
              <Label bsStyle="success">
                {product.price !== 0 ? <i className="fa fa-eur" aria-hidden="true">&nbsp;</i> : undefined}
                {product.price === 0 ? "Free!" : product.price}
              </Label>
            </span>
          </div>
          <div className="desc">
            <p className="description">{product.description}</p>
          </div>
        </div>
      </div>
    );
  }

  showStepView(step) {
    const { product, owner } = this.props.booking;
    const { selectedDay } = this.state;
    switch(step) {
      case 1:
        return (
          <div className="col-md-12 daypicker">
            <h3 className="text-center">Select day, when you want to request this offer</h3>
            <DayPicker
                initialMonth={new Date()}
                disabledDays={DateUtils.isPastDay}
                selectedDays={day => DateUtils.isSameDay(this.state.selectedDay, day)}
                onDayClick={this.handleDayClick }
            />
            <p className="text-center" style={{fontSize: "2em"}}>{selectedDay ? selectedDay.toLocaleDateString() : "Select date"}</p>
          </div>
        );
      case 2:
        return(
          <div className="col-md-12 block-center">
            <div className="text-center">
              <p>Event will be requested on</p>
              <p className="selected-day">{selectedDay.toLocaleDateString()}</p>
              <p>Do you want to continue?</p>
            </div>
          </div>
        );
      case 3:
        return(
          <div className="col-md-12">
            <ListGroup>
              <ListGroupItem header="Offer name">{product.label}</ListGroupItem>
              <ListGroupItem header="Buddy">{`${owner.firstName} ${owner.lastName}`}</ListGroupItem>
              <ListGroupItem header="City">{product.city.name}</ListGroupItem>
              <ListGroupItem header="Price">{product.price}</ListGroupItem>
              <ListGroupItem header="Request Date">{selectedDay.toLocaleDateString()}</ListGroupItem>
            </ListGroup>
            <Alert>
              After confirm, Buddy will be noted about your request. He can accept or decline your request.
            </Alert>
          </div>
        );
      case 4:
        return(
          <Alert>
            Your request was sent. Dont forget to check <Link to="/profile">My Buddy</Link>.
          </Alert>
        );
      default:
        break;
    }
  }

  showControls(step) {
    switch(step) {
      case 1:
        return(
          <div>
            <Button onClick={this.handleFirstStep} bsStyle="primary">Next&nbsp;<Glyphicon glyph="glyphicon glyphicon-chevron-right"></Glyphicon></Button>
          </div>
        );
      case 2:
        return(
          <div>
            <Button style={{marginRight: "15px"}} onClick={this.prevStep}><Glyphicon glyph="glyphicon glyphicon-chevron-left"></Glyphicon>&nbsp;No</Button>
            <Button onClick={this.nextStep} bsStyle="primary">Yes&nbsp;<Glyphicon glyph="glyphicon glyphicon-chevron-right"></Glyphicon></Button>
          </div>
        );
      case 3:
        return(
          <div>
            <Button style={{marginRight: "15px"}} onClick={this.cancelBooking} bsSize="large"><Glyphicon glyph="glyphicon glyphicon-remove"></Glyphicon>&nbsp;Cancel</Button>
            <span onClick={this.createTransaction}><SubmitButton  name="Confirm" bsStyle="primary" bsSize="large" isLoading={this.state.isLoading}/></span>
          </div>
        );
      case 4:
        return(
          <Button><Link to="/search"><Glyphicon glyph="glyphicon glyphicon-chevron-left"></Glyphicon>&nbsp;Back to searching</Link></Button>
        );
      default:
        break;
    }
  }

  render() {
    const { product, owner } = this.props.booking;
    return (
      <div className="col-lg-12">
        {this.state.currentStep > 2 ?
          undefined :
          <div className="row back-row">
            <Button><Link to="/search"><Glyphicon glyph="glyphicon glyphicon-chevron-left"></Glyphicon>&nbsp;Back to searching</Link></Button>
          </div>
        }
        <div className="row detail-product-row">
          {this.state.currentStep < 3 ? this.showProductDetail(product, owner) : undefined}
        </div>
        <Row>
          {this.state.lastStep === this.state.currentStep ? undefined : <BookingWizardProgressBar step={this.state.currentStep} />}
        </Row>
        <Row>
          <div className={`clearfix step-view step-${this.state.currentStep}`}>
            {this.showStepView(this.state.currentStep)}
          </div>
        </Row>
        <Row>
          <div className="controls col-md-6 col-md-offset-3">
            {this.showControls(this.state.currentStep)}
          </div>
        </Row>
      </div>
    );
  }
}

export const BookingWizard = connect()(BookingWizardRaw);
