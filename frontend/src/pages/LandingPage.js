import React, { Component } from 'react';


import {PageHeader} from '../components/LandingPage/PageHeader/PageHeader';
import {PageFooter} from '../components/common/PageFooter/PageFooter';
import {MainLogo} from '../components/LandingPage/MainLogo/MainLogo';
import {AboutPlatform} from '../components/LandingPage/AboutPlatform/AboutPlatform';
import {RegisterInfo} from '../components/LandingPage/RegisterInfo/RegisterInfo';

export class LandingPage extends Component {
  render() {
    return (

        <div>
            <PageHeader/>
            <div className="ident-top marginBottom">
                <MainLogo/>
                <AboutPlatform/>
                <RegisterInfo/>
            </div>
            <PageFooter/>
        </div>
    );
  };
}

