import React, { Component } from 'react';
import { MyRequestsListItem } from './MyRequestsListItem';
import { ListGroup, Alert } from 'react-bootstrap';
import api from '../../api.js';
import { connect } from 'react-redux';

export class MyRequestsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
            /*label: "",
            description: "",
            price: "",*/
        };
        this.getUserTransactions();
    }

    getUserTransactions() {
      let params = {
        params: {
          filter: {
            include: ['product'],
            where: {
              refUserId: localStorage.userId}
            }
          }
        };
      api.get('/Transactions?access_token=' + localStorage.accessToken, params)
        .then((response) => {
            console.log('--- getUserTransactions', response.data);
            this.appendTxnToProducts(response.data);
            this.setState({ transactions: response.data });
        })
        .catch((error) => {
          console.log("<!> getUserTransactions: ", error);
        });
    }

    appendTxnToProducts(transactions) {
      if (transactions) {
        var groups = {};
        for (var i = 0; i < transactions.length; i++) {
          var groupName = transactions[i].refProductId;
          if (!groups[groupName]) {
            groups[groupName] = [];
          }
          groups[groupName].push(transactions[i]);
        }
        var myArray = [];
        for (var groupName in groups) {
          myArray.push({refProductId: groupName, txns: groups[groupName]});
        }
        for (var group in myArray) {
          this.getProduct(myArray[group].refProductId, myArray[group].txns);
        }
      }
    }

    getProduct(id, transactions) {
      let params = {
        params: {
          filter: {
            include: ['productCity', 'categories', 'user']
          }
        }
      }
      api.get('/Products/'+ id +'?access_token=' + localStorage.accessToken, params)
        .then(response => {
          let product = response.data;
          let filteredTxns = [];
          if (product.state === "accepted" && product.refTravellerUserId != localStorage.userId) {
            //dont process product which is accepted but not by me
           } else {
            filteredTxns = transactions.filter((txn) => {
              if (txn.Status === 'cancelled') {
                return false;
              }
              let date = new Date(txn.Date);
              let today = new Date();
              if (date.getTime() < today.getTime()) {
                return false;
              }
              return true;
            });
          }
          product.transactions = filteredTxns;
          console.log('>>> request list processed', product);
          this.setState(previousState => ({
              products: [...previousState.products, product]
          }));
        })
        .catch((error) => {
          console.log('<!> error', error)
        });
    }

    componentWillMount() {

    }

    render () {
      var productItems = [];
      if (this.state.products) {
        productItems = this.state.products.map((product, key) => {
            return (
                <MyRequestsListItem key={product.id} product={product} />
            );
        });
      }

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
              <Alert bsStyle="warning"><i className="fa fa-exclamation-triangle"></i><span>You have no opened transactions!</span></Alert>
          );
        }

    }
}
