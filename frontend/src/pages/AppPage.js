import React, { Component } from 'react';
import {PageFooter} from '../components/common/PageFooter/PageFooter'
// Main Component of the Application all other pages are rendered from here

export class AppPage extends Component {
  render() {
     const {children} = this.props;
    return (
      <div className="container">
          {children}
      </div>


    );
  }
}
