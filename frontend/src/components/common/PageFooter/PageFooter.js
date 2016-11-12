import React, { Component } from 'react';

const appName ='TravelBuddy';
const version = '1.0.0';
const currentYear = new Date().getFullYear();
const copyright = <span>&copy;</span>;

export default class PageFooter extends Component {

    render() {
    return (
    <footer className="footer">
        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <p className="text-muted">{copyright} {currentYear} - {appName} - {version}</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
  };
}
