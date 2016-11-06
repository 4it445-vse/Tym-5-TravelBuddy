
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { createRoutes } from './createRoutes.js';

// Import CSS styles
import '../public/css/bootstrap.min.css';
import '../public/css/App.css';

// Import JavaScript


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