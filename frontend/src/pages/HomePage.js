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
            <div>
                {welcomeWizard}
                <PageHeader/>
                <div className="ident-top marginBottom">
                    <CreateProductComponent ref="a"/>
                        <div className="container">
                            <div className="row">
                                <div className="offerButton">
                                    <Button bsStyle="success" onClick={() => {
                                        this.refs.a.show()
                                    }}>Offer Product</Button>
                                </div>
                            </div>
                        </div>
                    <SearchSection/>
                </div>
                <PageFooter/>
            </div>


        );
    }
}
