import React, { Component } from 'react';
import { connect } from 'react-redux';

import { dummyAction } from '../../actions';

export class AddProductToCartButton extends Component {
  render() {
    const {
      product,
      dummyAction,
    } = this.props;
    return (
      <button
        onClick={() => dummyAction({ product })}
        type="button"
        className="btn btn-success"
      >
        <span
          className="glyphicon glyphicon-shopping-cart"
          aria-hidden="true">
        </span> Add to cart
      </button>
    );
  }
}

export const AddProductToCartButtonContainer = connect(
  () => ({}),
  { dummyAction },
)(AddProductToCartButton);
