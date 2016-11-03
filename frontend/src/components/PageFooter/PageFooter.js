import React, { Component } from 'react';

export class PageFooter extends Component {
  render() {
    return (
      <div className="footer">
        <p>© TravelBuddy - {new Date().getFullYear()} - App</p>
      </div>
    );
  }
}
