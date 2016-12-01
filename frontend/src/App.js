// Start Import

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { createRoutes } from './createRoutes.js';

// Import CSS styles


import '../public/css/font-awesome.min.css';
import '../public/css/bootstrap.min.css';
import '../public/css/react-bootstrap-table-all.min.css';
import '../public/css/App.css';

// Import JavaScript


// End Import

export class App extends Component {
  render() {
    const routes = createRoutes();
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default App;