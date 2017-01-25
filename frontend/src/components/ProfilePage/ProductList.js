import React, { Component } from 'react';
import { ProductListItem } from './ProductListItem';
import { ListGroup, Alert } from 'react-bootstrap';
import api from '../../api.js';
import { connect } from 'react-redux';

export class ProductListRaw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isLoading: true
            /*label: "",
            description: "",
            price: "",*/
        };
        this.loadProducts();
    }

    loadProducts() {
        const dataUrl = '/Products?access_token=' + localStorage.accessToken;
        const params = {
          params: {
            filter: {
              where: {refOwnerUserId: localStorage.userId},
              include: ['productCity', 'categories', 'transactions']
            }
          }
        };
        api.get(dataUrl, params).then((response) => {
            console.log('>>> loadProducts', response.data);
            let products = response.data;
            for (var i = 0; i < products.length;i++) {
              let filteredTxns = [];
              filteredTxns = products[i].transactions.filter((txn) => {
                //remove declined or cancelled
                if (txn.Status === 'declined' || txn.Status === 'cancelled') {
                  return false;
                }
                //remove old transactions
                let date = new Date(txn.Date);
                let today = new Date();
                if (date.getTime() < today.getTime()) {
                  return false;
                }
                return true;
              });
              products[i].transactions = filteredTxns;
            }
            this.setState({ products: products })
            this.setState({ isLoading: false });
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    render () {
        const productItems = this.state.products.map((product, key) => {
            if(this.props.productId && this.props.productState && this.props.productId === product.id) {
              product.state = this.props.productState;
            }
            if(this.props.acceptedTxn) {
              product.transactions[0] = this.props.acceptedTxn;
            }
            return (
                <ProductListItem key={product.id} product={product} />
            );
        });
        if (this.state.isLoading) {
          return (
            <div style={{paddingTop: "50px", height: "300px"}}>
                <div className="loading-bar text-center"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
            </div>
          );
        } else {
            if (productItems.length > 0) {
              return (
                <div className="container-fluid item-list">
                      <ListGroup className="clearfix">
                          {productItems}
                      </ListGroup>
                </div>
              );
            } else {
              return (
                  <Alert bsStyle="danger"><i className="fa fa-exclamation-triangle"></i><span>No records have been found!</span></Alert>
              );
            }
        }
    }
}

const mapStateToProps = (state) => {
  const { booking } = state;
  return {
    productId: booking.productId,
    productState: booking.productState,
    acceptedTxn: booking.acceptedTxn
  };
}

export const ProductList = connect(
  mapStateToProps
)(ProductListRaw);
