import React, { Component } from 'react';
import { TransactionListItem } from './TransactionListItem.js';
import { ListGroup, Alert } from 'react-bootstrap';
// import api from '../../api.js';

export class TransactionList extends Component {

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
                      <TransactionListItem key={txn.id} transaction={txn}/>
                  );
                }
                break;
              case "declined":
                if (txn.Status === "declined") {
                  return;
                }
              case "cancelled":
                if (txn.Status === "cancelled") {
                  return;
                }
                break;
              default:
                return (
                    <TransactionListItem key={txn.id} transaction={txn}/>
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
