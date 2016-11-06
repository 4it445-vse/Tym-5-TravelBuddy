import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { AppPage } from './pages/AppPage.js';
import { LandingPage } from './pages/LandingPage.js';
import { RegistrationPage } from './pages/RegistrationPage.js';
import { NoMatchPage } from './pages/NoMatchPage.js';

export function createRoutes() {
  return (
    <Route path="/" component={AppPage}>
      <IndexRoute component={LandingPage}/>
      <Route path="/registration" component={RegistrationPage}/>
      <Route path="*" component={NoMatchPage}/>
    </Route>
  );
}
