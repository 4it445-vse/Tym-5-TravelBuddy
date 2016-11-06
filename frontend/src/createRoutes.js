import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { AppPage } from './pages/AppPage.js';
<<<<<<< HEAD
import { ContactPage } from './pages/ContactPage.js';
import { HomePage } from './pages/HomePage.js';
import { NoMatchPage } from './pages/PageNotFound.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js'
import { ProductsPage } from './pages/ProductsPage.js';
import { ShoppingCartPage } from './pages/ShoppingCartPage.js'
=======
import { LandingPage } from './pages/LandingPage.js';
import { RegistrationPage } from './pages/RegistrationPage.js';
import { NoMatchPage } from './pages/NoMatchPage.js';
>>>>>>> 9a3300b2a77cffed6df4e0047e8affdf03fa5fe0

export function createRoutes() {
  return (
    <Route path="/" component={AppPage}>
      <IndexRoute component={LandingPage}/>
      <Route path="/registration" component={RegistrationPage}/>
      <Route path="*" component={NoMatchPage}/>
    </Route>
  );
}
