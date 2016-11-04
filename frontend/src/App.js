import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { useScroll } from 'react-router-scroll';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { createRoutes } from './createRoutes.js';

export class App extends Component {
  render() {
    const { store } = this.props;
    const routes = createRoutes();
    return (
      <Provider store={store}>
        <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
          {routes}
        </Router>
      </Provider>
    );
  }
}
