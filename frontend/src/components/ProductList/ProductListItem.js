import React, { Component } from 'react';
import { Link } from 'react-router';

import { AddProductToCartButtonContainer } from '../ShoppingCart/AddProductToCartButton.js';

export class ProductListItem extends Component {
  render() {
    const { product } = this.props;
    const { id, title, price, shortInfo } = product;
    return (
      <div className="product">
        <div className="pull-right">
          <AddProductToCartButtonContainer product={product} />
        </div>
        <h2>
          <Link to={`/products/${id}`}>{title}</Link>
        </h2>
        <p>price: <span className="price">{price} Kč</span></p>
        <p>{shortInfo}</p>
      </div>
    );
  }
}


