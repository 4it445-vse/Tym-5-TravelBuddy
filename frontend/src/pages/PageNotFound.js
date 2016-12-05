import React, { Component } from 'react';
import { Link } from "react-router";


export class PageNotFound extends Component {
  render() {
    return (
      <div id="main-wrapper" class="not-found-page">
        <header>
            <div className="header-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="header-content-inner">
                      <h1 id="homeHeading">404</h1>
                      <h2 id="homeHeading">Your journey ends here :(</h2>
                      <hr/>
                      <p><Link href="/">Back to Travel Buddy</Link></p>
                  </div>
                </div>
              </div>
            </div>
        </header>
      </div>
    );
  }
}
