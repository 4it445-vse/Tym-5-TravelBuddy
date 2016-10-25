import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'react-redux';

export class ShoppingCartPageRaw extends Component {
  render() {
    const { shoppingCart } = this.props;
    return (
      <div>
        <div className="jumbotron">
          <h1>Shopping Cart</h1>
        </div>
        {lodash.values(shoppingCart).map(({ product, count }) => (
          <div key={product.id}>
            <h3>{count} x {product.title}</h3>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { shoppingCart } = state;

  return {
    shoppingCart,
  };
}

export const ShoppingCartPage = connect(
  mapStateToProps,
)(ShoppingCartPageRaw);
