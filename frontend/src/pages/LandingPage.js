import React, { Component } from 'react';
<<<<<<< HEAD
import { About } from '../components/About/About.js';
import { PageHeader } from '../components/PageHeader/PageHeader';
import { PageFooter } from '../components/PageFooter/PageFooter';

class LandingPage extends Component {
    render() {
        return (
            <div className="container">
                  <About/>
                {/*<TopNavigation/>*/}
                <PageFooter/>
            </div>
        );
    }
}

export default LandingPage;
=======
import {PageHeader} from '../components/LandingPage/PageHeader/PageHeader';
import {PageFooter} from '../components/LandingPage/PageFooter/PageFooter';
import {About} from '../components/About/About';


export class LandingPage extends Component {
  render() {
    return (
        <div className="container">
            <PageHeader/>
            <About/>
            <PageFooter/>
        </div>
    );
  };
}
>>>>>>> 9a3300b2a77cffed6df4e0047e8affdf03fa5fe0
