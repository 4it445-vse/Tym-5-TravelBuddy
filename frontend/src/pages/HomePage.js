import React, {Component} from 'react';
import {PageFooter} from '../components/common/PageFooter/PageFooter';
import { MainNavigation } from '../components/HomePage/MainNavigation.js';
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

    getUserData() {
      api.get('UserMain/me?access_token=' + localStorage.accessToken)
        .then((response) => {
            console.log('--- getUserData', response.data);
            this.setState({ userData: response.data });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }

    componentDidMount() {
      this.getUserData();
    }

    render() {
        const { userData } = this.state;
        console.log('--- userData homepage', userData);
        let welcomeWizard = undefined;
        if (this.state.showWelcomeWizard) {
            welcomeWizard = <WelcomeWizardModal steps={2}/>;
        }

        return (
          <div id="main-wrapper" className="homepage">
              {welcomeWizard}
              <MainNavigation userData={userData}/>
              <section className="search">
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
            <PageFooter/>
          </div>
        );
    }
}
