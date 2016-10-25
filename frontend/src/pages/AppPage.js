import React, { Component } from 'react';

import { PageFooter } from '../components/PageFooter/PageFooter.js';
import { TopNavigation } from '../components/TopNavigation/TopNavigation.js';

export class AppPage extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="container">
        <TopNavigation/>
        {children}
        <PageFooter/>
      </div>
    );
  }
}
