import React, { Component } from 'react';
import { Affix } from 'react-overlays';
import { Button, Collapse } from 'react-bootstrap';
import Scroll from 'react-scroll';
import { LoginComponent } from '../LoginComponent/LoginComponent.js';

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
      <Affix affixClassName="affix" topStyle="affix-top">
        <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"></i>
                    </button>
                    <a className="navbar-brand page-scroll" href="#page-top">TravelBuddy</a>
                </div>

                {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link activeClass="active" to="about" spy={true} smooth={true} duration={500}>About</Link>
                        </li>
                        <li>
                            <Link activeClass="active" to="faq" spy={true} smooth={true} duration={500}>FAQ</Link>
                        </li>
                        {/* <li>
                            <a className="page-scroll" href="#portfolio">Register</a>
                        </li> */}
                        <li>
                            <Link activeClass="active" to="register" spy={true} smooth={true} duration={500}>Register</Link>
                        </li>
                        <li>
                            <a onClick={ ()=> this.setState({ open: !this.state.open })}><i className="fa fa-user"></i> Login</a>
                        </li>
                    </ul>
                </div>
                {/* <!-- /.navbar-collapse --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
            <Collapse in={this.state.open} className={`login-modal ${this.state.style}`} timeout="100">
              <div>
                  <LoginComponent/>
              </div>
            </Collapse>
        </nav>
      </Affix>
    );
  };
}
