import React, { Component } from 'react';
import {PageHeader} from '../components/LandingPage/PageHeader/PageHeader';
import {PageFooter} from '../components/LandingPage/PageFooter/PageFooter';
import {LoginComponent} from '../components/LandingPage/LoginComponent/LoginComponent';
export class LandingPage extends Component {
  render() {
    return (
        <div className="container">
            <PageHeader LoginComponent={LoginComponent}/>
            <PageFooter/>
        </div>
    );
  };
}
