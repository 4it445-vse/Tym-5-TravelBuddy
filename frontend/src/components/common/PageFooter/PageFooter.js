import React, { Component } from 'react';


export class PageFooter extends Component {
    render() {
    return (
    <footer className="footer">
        <div className="copyright">
            <div className="container">
                <div className="row">
                    <p className="text-muted">&copy; {new Date().getFullYear()} - TravelBuddy - Version 1.0.0.</p>
                </div>
            </div>
        </div>
    </footer>
    );
  };
}
