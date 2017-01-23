import React, { Component } from 'react';
import { MainNavigation } from '../components/HomePage/MainNavigation.js';
import { PageFooter} from '../components/common/PageFooter/PageFooter';
import { BookingWizard } from '../components/Booking/BookingWizard/BookingWizard.js';
// import { Panel, Tabs, Tab } from "react-bootstrap";
import api from '../api.js';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export class BookingPageRaw extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect: undefined
    }

  }

  componentWillMount() {
    if (!this.props.booking.product) {
      this.setState({ redirect: true });
      browserHistory.push('/search');
    }
    return;
  }

  componentDidMount() {

  }

  render() {
    if (this.state.redirect) {
      return (
        <div></div>
      );
    } else {
      return (
        <div id="main-wrapper" className="booking-page">
          <div className="gradient-wrapper">
            <MainNavigation />
            <section className="booking-wizard">
                <div className="container">
                    <BookingWizard booking={this.props.booking}/>
                </div>
            </section>
            <PageFooter/>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { booking } = state;
  return {
    booking
  };
}

export const BookingPage = connect(
  mapStateToProps
)(BookingPageRaw);
