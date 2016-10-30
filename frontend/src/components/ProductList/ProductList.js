import React, { Component } from 'react';

import { ProductListItem } from './ProductListItem.js';

export class ProductList extends Component {
  render() {
    const { products } = this.props;

    return (
      <div className="products">
        {products.map(product =>
          <ProductListItem product={product} key={product.id}/>
        )}
      </div>
    );
  }
}
