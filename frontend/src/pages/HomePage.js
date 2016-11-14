import React, { Component } from 'react';
import { PageFooter } from '../components/common/PageFooter/PageFooter';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { SearchSection } from '../components/HomePage/SearchSection/SearchSection';
import { TopPropositions } from '../components/HomePage/TopPropositions/TopPropositions';
import { WelcomeWizardModal } from '../components/WelcomeWizard/WelcomeWizardModal.js';
import api from '../api.js';
export class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showWelcomeWizard: false
    }

    // this.showModal = this.showModal.bind(this);
    this.showModal();

  }

  showModal() {
    api.get('UserMain/' + sessionStorage.userId)
      .then((response)=> {
        console.log('--- homepage api get', response);
        this.setState({showWelcomeWizard: response.data.isFirstLogin});
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  render() {
    if(this.state.showWelcomeWizard) {
      var welcomeWizard = <WelcomeWizardModal steps={2}/>;
    } else {
      var welcomeWizard = undefined;
    }

    return (
      <div>
          {welcomeWizard}
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
