import React, { Component } from 'react';
// import { Affix } from 'react-overlays';
// import { Button, Fade } from 'react-bootstrap';
import Scroll from 'react-scroll';
import {LogoutComponentContainer} from '../LogoutComponent/LogoutComponent.js';

const Link = Scroll.Link;

export class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: "",
      style: "affix"
    };
  }

  //TODO change class of login-modal on scroll, affix-top on top, affix on affixed

  render() {
    return (
        <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                    </button>
                    <a className="navbar-brand page-scroll" href="/" onClick={() => {Scroll.animateScroll.scrollToTop(500)}}>TravelBuddy</a>
                </div>

                {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="/">Search</a>
                        </li>
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <LogoutComponentContainer/>
                        </li>
                    </ul>
                </div>
                {/* <!-- /.navbar-collapse --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
        </nav>
    );
  };
}
