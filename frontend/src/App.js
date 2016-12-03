// Start Import

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { createRoutes } from './createRoutes.js';

// Import CSS styles





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
