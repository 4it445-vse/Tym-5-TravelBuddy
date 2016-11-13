import React, { Component } from 'react';
import { PageFooter } from '../components/common/PageFooter/PageFooter';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { SearchSection } from '../components/HomePage/SearchSection/SearchSection';
import { TopPropositions } from '../components/HomePage/TopPropositions/TopPropositions';
import { WelcomeWizardModal } from '../components/WelcomeWizard/WelcomeWizardModal.js';

export class HomePage extends Component {

  render() {
    return (
      <div>
          <WelcomeWizardModal show="true"/>
          <PageHeader/>
          <div className="jumbotron">
            <h1>Home page</h1>
          </div>
          <div className="ident-top marginBottom">
              <SearchSection/>
              <TopPropositions/>
          </div>
          <PageFooter/>
      </div>


    );
  }
}
