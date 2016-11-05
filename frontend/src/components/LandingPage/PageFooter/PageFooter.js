import React, { Component } from 'react';


export class PageFooter extends Component {
    render() {
    return (
    <footer className="bgwhite">
        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        &copy; {new Date().getFullYear()} - TravelBuddy - Version 1.0.0
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
  };
}
