import React, {Component} from 'react';

import { LandingPage } from './pages/LandingPage.js';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/general.css';

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