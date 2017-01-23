import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { cancelRequestAction } from '../Booking/actions.js';


export class MyRequestsTransactionListItemRaw extends Component{

    constructor(props) {
      super(props);
      this.state = {
        expandTransactions: false,
        hide: false,
      }
    }

    handleCancel() {
      this.props.dispatch(cancelRequestAction(this.props.transaction));
      this.setState({hide: true});
    }

    render() {
        const requestDate = new Date(this.props.transaction.Date).toLocaleDateString();
        if (!this.state.hide) {
          return (
            <div className="col-lg-12">
              <ListGroupItem>
                <div className={this.props.transaction.Status}>
                  <span className="date">{requestDate}</span>
                  {this.props.transaction.Status === "accepted" || this.props.transaction.Status === "declined" ?
                    undefined
                    :
                    <ButtonGroup>
                      <Button onClick={this.handleCancel.bind(this)} bsStyle="primary"><Glyphicon glyph="glyphicon glyphicon-remove"></Glyphicon>&nbsp;Cancel</Button>
                    </ButtonGroup>
                  }
                  {this.props.transaction.Status === "declined" ?
                    <ButtonGroup>
                      <Button disabled={true} bsStyle="primary">Declined</Button>
                    </ButtonGroup>
                    :
                    undefined
                  }
                </div>
              </ListGroupItem>
            </div>
          );
        } else {
          return (
            <div style={{display: "none"}}></div>
          );
        }
    }
}

export const MyRequestsTransactionListItem = connect()(MyRequestsTransactionListItemRaw)
