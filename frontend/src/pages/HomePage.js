import React, {Component} from 'react';
import { PageFooter } from '../components/common/PageFooter/PageFooter';
import { MainNavigation } from '../components/HomePage/MainNavigation.js';
import { SearchSection } from '../components/HomePage/SearchSection/SearchSection';
import { WelcomeWizardModal } from '../components/WelcomeWizard/WelcomeWizardModal.js';
import { DetailProduct } from '../components/HomePage/DetailProduct/DetailProduct';
import api from '../api.js';

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showWelcomeWizard: false,
        };
        this.handleShowWelcomeWizard();
    }

    handleShowWelcomeWizard() {
        api.get('UserMain/me?access_token=' + localStorage.accessToken)
            .then((response) => {
                // console.log('--- homepage api get', response);
                this.setState({showWelcomeWizard: response.data.isFirstLogin});
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

    getUserData() {
      api.get('UserMain/me?access_token=' + localStorage.accessToken)
        .then((response) => {
            // console.log('--- getUserData', response.data);
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
        let welcomeWizard = undefined;
        if (this.state.showWelcomeWizard) {
            welcomeWizard = <WelcomeWizardModal steps={2}/>;
        }

        return (
          <div id="main-wrapper" className="homepage">
            <div className="gradient-wrapper">
              {welcomeWizard}
              <MainNavigation userData={userData}/>
              <section className="search">
                  <DetailProduct ref="detailProductModal"/>
                  <div className="container">
                      <h1 className="text-center">Offers</h1>
                      <SearchSection modal={this.refs.detailProductModal}/>
                  </div>
              </section>
              <PageFooter/>
            </div>
          </div>
        );
    }
}
