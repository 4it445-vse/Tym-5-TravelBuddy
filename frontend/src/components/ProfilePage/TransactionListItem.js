import React, { Component } from 'react';
import { Button, ButtonGroup, Glyphicon, Panel, Label, ListGroupItem } from 'react-bootstrap';
import api from '../../api.js';
import { connect } from 'react-redux';
import { acceptRequestAction, declineRequestAction } from '../Booking/actions.js';


export class TransactionListItemRaw extends Component{

    constructor(props) {
      super(props);
      this.state = {
        expandTransactions: false,
        hide: false,
      }
    }

    componentWillMount() {
      this.getUserName(this.props.transaction.refUserId);
    }

    getUserName(userId) {
      let params = {
        params: {
          filter: {
            fields: {lastName: true, firstName: true}
          }
        }
      }
      api.get('/UserMain/'+ userId +'?access_token=' + localStorage.accessToken, params)
        .then(response => {
          const { data } = response;
          this.setState({ fullName: data.firstName + ' ' + data.lastName });
        })
        .catch((error) => {
          console.log('<!> error', error)
        });
    }

    handleDecline() {
      this.props.dispatch(declineRequestAction(this.props.transaction));
      this.setState({hide: true});
    }

    handleAccept() {
      this.props.dispatch(acceptRequestAction(this.props.transaction));
    }

    render() {
        const requestDate = new Date(this.props.transaction.Date).toLocaleDateString();
        if (!this.state.hide) {
          return (
            <div className="col-lg-12">
              <ListGroupItem>
                <div className={this.props.transaction.Status}>
                  <span className="date">{requestDate}</span>
                  <span>requested by</span>
                  <span className="userName">{this.state.fullName}</span>
                  {/* <span>Note: {this.props.transaction.Note}</span> */}
                  {/* <span>state: {this.props.transaction.Status}</span> */}
                  {this.props.transaction.Status === "accepted" ?
                    undefined
                    :
                    <ButtonGroup>
                      <Button onClick={this.handleAccept.bind(this)} bsStyle="primary"><Glyphicon glyph="glyphicon glyphicon-ok"></Glyphicon>&nbsp;Accept</Button>
                      <Button onClick={this.handleDecline.bind(this)} bsStyle="primary"><Glyphicon glyph="glyphicon glyphicon-remove"></Glyphicon>&nbsp;Decline</Button>
                    </ButtonGroup>
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

export const TransactionListItem = connect()(TransactionListItemRaw)
