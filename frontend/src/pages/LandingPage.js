import React, { Component } from 'react';
<<<<<<< HEAD

import {PageHeader} from '../components/LandingPage/PageHeader/PageHeader';
import {PageFooter} from '../components/LandingPage/PageFooter/PageFooter';
import {About} from '../components/About/About';
=======
import { PageHeader } from '../components/LandingPage/PageHeader/PageHeader';
import  PageFooter  from '../components/common/PageFooter/PageFooter'
import { AboutPlatform } from '../components/LandingPage/AboutPlatform/AboutPlatform';

>>>>>>> 05b98affbdc67bb6b39c08cc390d06f4bcee156e


export class LandingPage extends Component {
  render() {
    return (
        <div>
            <PageHeader/>
            <div className="ident-top">

            </div>
            <PageFooter/>
        </div>
    );
  };
}
