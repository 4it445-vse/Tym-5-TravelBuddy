import React, { Component } from 'react';
import {LoginComponent} from '../LoginComponent/LoginComponent';

export class PageHeader extends Component {
    render() {
        const menuItems = [
            ["#at-home", "Home"],
            ["#at-about", "Platform"],
            ["#at-register", "Register"],
        ];
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Travel Buddy</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            {menuItems.map(([link, title], index) => (
                                <li key={index}>
                                    <a href={link}>{title}</a>
                                </li>
                            ))}
                        </ul>
                       <ul className="nav navbar-nav navbar-right">
                           <div className="login-form-element">

                           </div>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}
