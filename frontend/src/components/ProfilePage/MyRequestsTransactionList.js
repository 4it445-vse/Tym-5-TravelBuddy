import React, { Component } from 'react';
import { MyRequestsTransactionListItem } from './MyRequestsTransactionListItem.js';
import { ListGroup, Alert } from 'react-bootstrap';
// import api from '../../api.js';

export class MyRequestsTransactionList extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        let listStyle = "";
        const txnItems = this.props.transactions.map((txn, key) => {
            switch(this.props.type) {
              case "accepted":
                if (txn.Status === "accepted") {
                  listStyle = "accepted";
                  return (
                      <MyRequestsTransactionListItem key={txn.id} transaction={txn}/>
                  );
                }
                break;
              default:
                if (txn.Status === "cancelled") {
                  console.log('--- this one is cancelled')
                  return;
                }
                return (
                    <MyRequestsTransactionListItem key={txn.id} transaction={txn}/>
                );
            }
        });
        if (txnItems.length > 0) {
            return (
              <div className={`transaction-list ${listStyle}`}>
                <div className="container-fluid item-list">
                      <ListGroup className="clearfix">
                          {txnItems}
                      </ListGroup>
                </div>
              </div>
            );
        } else {
            return (
                <Alert bsStyle="danger"><i className="fa fa-exclamation-triangle"></i><span>No records have been found!</span></Alert>
            );
        }
    }
}
