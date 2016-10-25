import React, { Component } from 'react';

import api from '../api.js';
import { ProductList } from '../components/ProductList/ProductList.js';

export class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }

  componentDidMount() {
    api('products')
      .then((response) => {
        this.setState({ products: response.data });
      });
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <div className="jumbotron">
          <h1>All Products</h1>
        </div>
        {products === null ?
          <div>Loading...</div> :
          <ProductList products={products}/>
        }
      </div>
    );
  }
}
