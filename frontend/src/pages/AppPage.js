import React, { Component } from 'react';

// Main Component of the Application all other pages are rendered from here

export class AppPage extends Component {
  render() {
     const {children} = this.props;
    return (

      <div>
        {/*<div className="container">*/}
          {children}
      </div>
    );
  }
}
