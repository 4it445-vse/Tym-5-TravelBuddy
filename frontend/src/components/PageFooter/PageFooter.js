import React, { Component } from 'react';

export class PageFooter extends Component {
  render() {
    return (
      <div className="footer">
        <p>© Company {new Date().getFullYear()}</p>
      </div>
    );
  }
}
