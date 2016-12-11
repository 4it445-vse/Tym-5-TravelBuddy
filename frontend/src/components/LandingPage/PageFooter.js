import React, { Component } from 'react';
import Scroll from 'react-scroll';

const Link = Scroll.Link;

const version = 'Version 1.0.0';
const currentYear = new Date().getFullYear();
const copyright = <span>&copy;</span>;

export class PageFooter extends Component {

    render() {
    return (
      <footer className="bg-primary">
          <div className="container">
              <div className="row footer">
                  <div className="col-lg-4 text-center">
                      <h3>Navigate</h3>
                          <div className="row"><Link className="text-default" to="about" smooth={true} duration={500}>About</Link></div>
                          <div className="row"><Link className="text-default" to="faq" spy={true} smooth={true} duration={500}>FAQ</Link></div>
                          <div className="row"><Link className="text-default" to="register" spy={true} smooth={true} duration={500}>Register</Link></div>
                          <div className="row"><a className="text-default" href="/terms">Terms and Conditions</a></div>
                  </div>
                  <div className="col-lg-4 text-center">
                      <h3>About us</h3>
                  </div>
                  <div className="col-lg-4 text-center">
                      <h3>Connect</h3>
                      <p>Social Sites</p>
                  </div>
              </div>
              <div className="row legal">
                  <div className="col-lg-12">
                      <hr className="light"/>
                      <a className="footer-brand" onClick={() => {Scroll.animateScroll.scrollToTop(300)}}>TravelBuddy</a>
                      <legal className="">{copyright} {currentYear} - {version}</legal>
                  </div>
              </div>
          </div>
      </footer>
    );
  };
}
