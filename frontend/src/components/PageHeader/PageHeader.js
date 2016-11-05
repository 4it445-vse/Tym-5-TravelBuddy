import React, { Component } from 'react';
import {LoginComponent}  from '../LoginComponent/LoginComponent';
export class PageHeader extends Component {

    render() {
        return (
            <header className="header-navbar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="navbar main-nav navbar-default" role="navigation">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".at-navbar">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                  {/*  <a href="#" className="logo"><img src="logo" alt="logo"></a>*/}
                                </div>
                                <div className="collapse navbar-collapse at-navbar">
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="current"><a href="#at-home">Home</a></li>
                                        <li><a href="#at-features">Platform</a></li>
                                        <li><a href="#at-gallery">How To</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
