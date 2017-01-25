import React, { Component } from 'react';
// import { Affix } from 'react-overlays';
// import { Button, Fade } from 'react-bootstrap';
import Scroll from 'react-scroll';
import { Link } from 'react-router';
import { LogoutComponentContainer } from '../LogoutComponent/LogoutComponent.js';

export class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: "",
      style: "affix",
      userData: undefined
    };
  }

  componentDidMount() {
    this.setState({ userData: this.props.userData });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ userData: nextProps.userData });
  }

  //TODO change class of login-modal on scroll, affix-top on top, affix on affixed

  render() {
    return (
        <nav id="mainNav" className="navbar navbar-app navbar-default navbar-fixed-top">
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
                            <Link to="/search" activeClassName="active"><i className="fa fa-search"></i>&nbsp;Search</Link>
                            {/* <a href="/search"><i className="fa fa-search"></i>&nbsp;Search</a> */}
                        </li>
                        <li>
                            <Link to="/profile" activeClassName="active"><i className="fa fa-user"></i>&nbsp;My Buddy</Link>
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
