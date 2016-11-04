import React, { Component } from 'react';


export class PageFooter extends Component {

    render() {
    return (
      <div className="footer text-right">
        <p>© TravelBuddy - {new Date().getFullYear()} - Version 1.0.0</p>
      </div>
    );
  }
}
