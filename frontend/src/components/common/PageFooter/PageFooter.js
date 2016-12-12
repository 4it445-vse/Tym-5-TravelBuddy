import React, { Component } from 'react';
import Scroll from 'react-scroll';

// const appName ='TravelBuddy';
const version = 'Version 1.0.0';
const currentYear = new Date().getFullYear();
const copyright = <span>&copy;</span>;

export class PageFooter extends Component {

    render() {
      return (
        // <footer className="footer">
        //     <div className="copyright">
        //         <div className="container">
        //             <div className="row">
        //                 <div className="col-md-6 col-lg-6 col-sm-6 col-xs-8
        //                 col-md-offset-3 col-lg-offset-3 col-sm-offset-3 col-xs-offset-2">
        //                     <p className="text-muted">{copyright} {currentYear} - {appName} - {version}</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
        <footer className="bg-primary footer-app">
            <div className="container">
                <div className="row legal">
                    <div className="col-lg-12">
                        <a className="footer-brand" onClick={() => {Scroll.animateScroll.scrollToTop(300)}}>TravelBuddy</a>
                        <legal className="">{copyright} {currentYear} - {version}</legal>
                    </div>
                </div>
            </div>
        </footer>
      );
  };
}
