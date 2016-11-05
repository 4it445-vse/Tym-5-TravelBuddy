import React, { Component } from 'react';
import {PageHeader} from '../components/LandingPage/PageHeader/PageHeader';
import {PageFooter} from '../components/LandingPage/PageFooter/PageFooter';
import {About} from '../components/About/About';


export class LandingPage extends Component {
  render() {
    return (
        <div className="container">
            <PageHeader/>
            <About/>
            <PageFooter/>
        </div>
    );
  };
}
