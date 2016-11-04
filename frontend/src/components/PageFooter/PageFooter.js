import React, { Component } from 'react';


class PageFooter extends Component {

    render() {
    return (
      <div className="footer">
        <p>© TravelBuddy - {new Date().getFullYear()} - Version 1.0.0</p>
      </div>
    );
  }
}

export default PageFooter;