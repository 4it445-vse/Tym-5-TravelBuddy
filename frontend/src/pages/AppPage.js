import React, { Component } from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import {PageFooter} from '../components/PageFooter/PageFooter';
import { TopNavigation } from '../components/TopNavigation/TopNavigation';


export class AppPage extends Component {
  render() {
     const {children} = this.props;
    return (
      <div className="container">
          <PageHeader/>

          {children}
          <PageFooter/>
      </div>
    );
  }
}
