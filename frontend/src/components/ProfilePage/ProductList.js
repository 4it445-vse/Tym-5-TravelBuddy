import React, { Component } from 'react';
import { ProductListItem } from './ProductListItem';
import { ListGroup, Alert } from 'react-bootstrap';
import api from '../../api.js';
import { connect } from 'react-redux';

export class ProductListRaw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
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
              include: [
                {
                  relation: "productCity"
                },
                {
                  relation: "categories"
                },
                {
                  relation: "transactions",
                  scope: {
                    include: {
                      relation: "user"
                    }
                  }
                }
              ]
            }
          }
        };
        api.get(dataUrl, params).then((response) => {
            if (response.status === 200) {
              console.log('>>> loadProducts', response.data);
              let products = response.data;
              for (var i = 0; i < products.length;i++) {
                let filteredTxns = [];
                filteredTxns = products[i].transactions.filter((txn) => {
                  if (txn.Status === 'declined') {
                    return false;
                  }
                  return true;
                });
                products[i].transactions = filteredTxns;
              }

              // products.product.transactions = filteredTxns;
              this.setState({products: products}) // pole hodnot - objects - potřeba zjistit atribut, ve kterým se vrací pole

            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    render () {
        const productItems = this.state.products.map((product, key) => {
            if(this.props.productId && this.props.productId === product.id) {
              product.state = this.props.productState;
            }
            return (
                <ProductListItem key={product.id} product={product} />
            );
        });
        if (productItems.length > 0) {
            return (
                // <div>
                //     <Grid>
                //         <Row>
                //             <Col sm={2} md={2} lg={2}>Label</Col>
                //             <Col sm={3} md={3} lg={3}>Description</Col>
                //             <Col sm={2} md={2} lg={2}>Price</Col>
                //             <Col sm={2} md={2} lg={2}>Request</Col>
                //         </Row>
                //         {productItems}
                //     </Grid>
                // </div>
                <div className="container-fluid item-list">
                      <ListGroup className="clearfix">
                          {productItems}
                      </ListGroup>
                </div>
            );
        } else {
            return (
                // <Grid>
                //     <Row>
                //         <Col sm={12} md={12} lg={12}>No records have been found!</Col>
                //     </Row>
                // </Grid>
                <Alert bsStyle="danger"><i className="fa fa-exclamation-triangle"></i><span>No records have been found!</span></Alert>
            );
        }
    }
}

const mapStateToProps = (state) => {
  const { booking } = state;
  return {
    productId: booking.productId,
    productState: booking.productState
  };
}

export const ProductList = connect(
  mapStateToProps
)(ProductListRaw);
