import React, { Component } from 'react';


import {PageHeader} from '../components/LandingPage/PageHeader/PageHeader';
import {PageFooter} from '../components/common/PageFooter/PageFooter';

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

