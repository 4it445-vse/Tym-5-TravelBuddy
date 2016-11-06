<<<<<<< HEAD
import React, {Component} from 'react';

import { LandingPage } from './pages/LandingPage.js';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/general.css';
=======
// Import React Components
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { createRoutes } from './createRoutes.js';

// Import CSS styles
import '../public/css/bootstrap.min.css';
import '../public/css/App.css';

// Import JavaScript


>>>>>>> 9a3300b2a77cffed6df4e0047e8affdf03fa5fe0

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="container">
                <LandingPage/>
            </div>
        );
    }
}

export default App;