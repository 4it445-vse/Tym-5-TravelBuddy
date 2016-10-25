import React, { Component } from 'react';
import { Link } from 'react-router';

export class TopNavigation extends Component {
  render() {
    return (
      <div className="header">
        <ul className="nav nav-pills pull-right">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
        <h3 className="text-muted"><Link to="/">E-shop</Link></h3>
      </div>
    );
  }
}
