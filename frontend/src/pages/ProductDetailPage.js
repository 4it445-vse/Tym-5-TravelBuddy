import React, { Component } from 'react';
import classNames from 'classnames';

import api from '../api.js';
import { AddProductToCartButtonContainer } from '../components/ShoppingCart/AddProductToCartButton.js';

export class ProductDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabId: 0,
      product: null,
    };
  }

  componentDidMount() {
    const { productId } = this.props.params;
    api(`products/${productId}`,
      {
        params: {
          filter: { include: "category" },
        },
      }
    ).then((response) => {
      this.setState({ product: response.data });
    });
  }

  selectTab(event, tabId) {
    event.preventDefault();
    this.setState({ activeTabId: tabId })
  }

  render() {
    const { product, activeTabId } = this.state;
    if (!product) {
      return <div>Loading...</div>;
    }

    const {
      category,
      title,
      price,
      shortInfo,
    } = product;
    const {
      name: categoryName,
    } = category || {};

    return (
      <div>
        <div className="jumbotron">
          <h1>{title}</h1>
        </div>
        <div className="pull-right">
          <AddProductToCartButtonContainer product={product} />
        </div>
        <h3>{ categoryName }</h3>
        <p>price: <span className="price">{price} Kč</span></p>
        <p>{shortInfo}</p>

        <div className="product">
          <ul className="nav nav-tabs">
            <li role="presentation" className={classNames({ active: 0 === activeTabId })}>
              <a href="#" onClick={(event) => this.selectTab(event, 0)}>
                Description
              </a>
            </li>
            <li role="presentation" className={classNames({ active: 1 === activeTabId })}>
              <a href="#" onClick={(event) => this.selectTab(event, 1)}>
                Parameters
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
