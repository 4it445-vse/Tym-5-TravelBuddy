import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { AppPage } from './pages/AppPage.js';
import { LandingPage } from './pages/LandingPage.js';
import { RegistrationPage } from './pages/RegistrationPage.js';
import { TermsOfServicePage } from './pages/TermsOfServicePage.js';
import { VerifiedPage } from './pages/VerifiedPage.js';
import { PageNotFound } from './pages/PageNotFound.js';
import { ProfilePage } from "./pages/ProfilePage.js";
import { AuthenticationWrapper } from "./components/AuthenticationWrapper.js";
import { RootPageWrapper } from "./pages/RootPageWrapper.js";
import { HomePage } from "./pages/HomePage.js";

export function createRoutes() {
  return (
    <Route path="/" component={AppPage}>
      <IndexRoute component={RootPageWrapper(AuthenticationWrapper(HomePage),LandingPage)}/>
      <Route path="/registration" component={RegistrationPage}/>
      <Route path="/terms" component={TermsOfServicePage}/>
      <Route path="/verified" component={VerifiedPage}/>
      <Route path="*" component={PageNotFound}/>
      <Route path="/profile" component={AuthenticationWrapper(ProfilePage)}/>
    </Route>
  );
}
