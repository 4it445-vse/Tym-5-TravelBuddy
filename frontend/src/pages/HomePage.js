import React, {Component} from 'react';
import {PageFooter} from '../components/common/PageFooter/PageFooter';
import {PageHeader} from '../components/HomePage/PageHeader/PageHeader';
import {SearchSection} from '../components/HomePage/SearchSection/SearchSection';
import {WelcomeWizardModal} from '../components/WelcomeWizard/WelcomeWizardModal.js';
import {CreateProductComponent} from "../components/CreateProduct/CreateProductComponent.js";
import {Button} from 'react-bootstrap';
import api from '../api.js';

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showWelcomeWizard: false,
      showCreateProducts: false,
        };

        // this.showModal = this.showModal.bind(this);
        this.handleShowWelcomeWizard();

    }

    handleShowWelcomeWizard() {
        api.get('UserMain/me?access_token=' + localStorage.accessToken)
            .then((response) => {
                console.log('--- homepage api get', response);
                this.setState({showWelcomeWizard: response.data.isFirstLogin});
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

    render() {
        let welcomeWizard;
        if (this.state.showWelcomeWizard) {
            welcomeWizard = <WelcomeWizardModal steps={2}/>;
        } else {
            welcomeWizard = undefined;
        }

        return (
      <div id="main-wrapper" className="homepage">
                {welcomeWizard}
                <PageHeader/>
          <section className="no-padding" id="portfolio">

          </section>

          <section className="">
              <CreateProductComponent ref="a"/>
              <div className="container">
                  <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-lg-push-4 col-md-push-4 col-sm-push-4 col-xs-push-4 text-center">
                          <Button bsStyle="primary" onClick={() => {this.refs.a.show()}}>Offer Product</Button>
                      </div>
                  </div>
              </div>
              <div className="container">
                  <div className="row">
                    <SearchSection/>
                  </div>
              </div>
          </section>
          <section className="text-center">
          <PageFooter/>
          </section>
            </div>


        );
    }
}
