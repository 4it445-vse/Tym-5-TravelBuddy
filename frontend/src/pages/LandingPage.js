import React, { Component } from 'react';
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
