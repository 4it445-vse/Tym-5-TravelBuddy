import React, { Component } from 'react';
import { PageFooter } from '../components/common/PageFooter/PageFooter';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { SearchSection } from '../components/HomePage/SearchSection/SearchSection';
import { TopPropositions } from '../components/HomePage/TopPropositions/TopPropositions';
import { WelcomeWizardModal } from '../components/WelcomeWizard/WelcomeWizardModal.js';
import { CreateProductComponent } from "../components/CreateProduct/CreateProductComponent.js";
import { Button } from 'react-bootstrap';
import api from '../api.js';
export class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCreateProducts: false,
    };

    // this.showModal = this.showModal.bind(this);
    this.handleShowWelcomeWizard();

  }

  handleShowWelcomeWizard() {
    api.get('UserMain/me?access_token=' + localStorage.accessToken)
      .then((response)=> {
        console.log('--- homepage api get', response);
        this.setState({showWelcomeWizard: response.data.isFirstLogin});
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  render() {
    let welcomeWizard = undefined;
    if(this.state.showWelcomeWizard) {
      welcomeWizard = <WelcomeWizardModal steps={2}/>;
    }

    return (
      <div id="main-wrapper" className="homepage">
          {welcomeWizard}
          <PageHeader/>
          <section className="no-padding">
          </section>

          <section className="bg-dark">
              <div className="container">
                  <div className="row">
                    <SearchSection/>
                  </div>
              </div>
          </section>

          {/* <section className="bg-primary">
              <TopPropositions/>
          </section> */}
          {/* <div className="jumbotron">
            <h1>Home page</h1>
          </div>

          <div className="ident-top marginBottom">
              <CreateProductComponent show={this.state.showCreateProducts} ref="a"/>
              <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <Button bsStyle="primary" onClick={() => {this.refs.a.show()}}>Add Product</Button>
                  </div>
              </div>

              <div className="row">
              <SearchSection/>
              </div>
          </div>
          <PageFooter/>*/}
      </div>


    );
  }
}
