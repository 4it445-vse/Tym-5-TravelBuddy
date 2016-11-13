import React, { Component } from 'react';
import { PageFooter } from '../components/common/PageFooter/PageFooter';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { SearchSection } from '../components/HomePage/SearchSection/SearchSection';
import { TopPropositions } from '../components/HomePage/TopPropositions/TopPropositions';

export class HomePage extends Component {

  render() {
    return (
      <div>
          <PageHeader/>
        <div className="jumbotron">
          <h1>Home page</h1>
        </div>
          <div className="ident-top marginBottom">
              <div className="h3">Welcome to your home page.</div>

              <TopPropositions/>
          </div>
          <PageFooter/>
      </div>


    );
  }
}
