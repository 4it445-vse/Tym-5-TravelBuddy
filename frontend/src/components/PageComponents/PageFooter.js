import React, { Component } from 'react';

const appName ='TravelBuddy';
const version = 'Version 1.0.0';
const currentYear = new Date().getFullYear();
const copyright = <span>&copy;</span>;

export class PageFooter extends Component {

    render() {
    return (
    <footer className="bg-primary">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 text-center">
                    <h3>Navigate</h3>
                    <p className="">odkazy</p>
                </div>
                <div className="col-lg-4 text-center">
                    <h3>Connect</h3>
                    <p className="">social</p>
                </div>
                <div className="col-lg-4 text-center">
                    <h3>About us</h3>
                </div>
            </div>
            <div className="row legal">
                <div className="col-lg-12">
                    <hr className="light"/>
                    <a className="footer-brand" href="#page-top">TravelBuddy</a>
                    <legal className="">{copyright} {currentYear} - {version}</legal>
                </div>
            </div>
        </div>
    </footer>
    );
  };
}
