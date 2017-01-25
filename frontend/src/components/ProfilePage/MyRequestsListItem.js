import React, { Component } from 'react';
import { Button, ButtonGroup, Panel, Label, ListGroupItem } from 'react-bootstrap';
import { MyRequestsTransactionList } from './MyRequestsTransactionList.js';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export class MyRequestsListItemRaw extends Component{

    constructor(props) {
      super(props);
      this.state = {
        expandTransactions: false,
        controlButton: this.props.product.state,
        productState: this.props.product.state
      }
    }

    showLabel(label) {
      switch (label) {
        case "active":
          return (
            <Label bsStyle="warning">{label}</Label>
          );
        case "accepted":
          return (
            <Label bsStyle="success">{label}</Label>
          );
        case "deactivated":
          return (
            <Label bsStyle="danger">N/A</Label>
          );
        default:
          break;

      }
    }

    renderByProductState(state) {
      const acceptedTxn = this.props.product.transactions;
      switch (state) {
        case "accepted":
          return (
            <MyRequestsTransactionList transactions={acceptedTxn} type="accepted"/>
          );
        case "active":
          return (
            <div className="footer container-fluid gradient-overlay">
              <div className="col-md-3">

              </div>
              <div className="col-md-3">

              </div>
              <div className="col-md-6 text-right">
                <ButtonGroup>
                  <Button type="button" className="btn btn-primary" onClick={ ()=> this.setState({ expandTransactions: !this.state.expandTransactions })}>
                    Your Requests ({this.props.product.transactions.length})&nbsp;{this.state.expandTransactions ? <i className="fa fa-chevron-up" aria-hidden="true"></i> : <i className="fa fa-chevron-down" aria-hidden="true"></i>}
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          );
        case "deactivated":
          return(
            <div className="footer container-fluid gradient-overlay">
              <div className="col-md-12 warning">
                <span className="warning"><i className="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;Offer is no longer available</span>
              </div>
            </div>
          );
        default:
          return;

      }
    }

    render() {
        var imageUrl = "/api/containers/productPictures/download/"+this.props.product.picture +"?access_token="+localStorage.accessToken;
        var style = {
          backgroundImage: "url(" + imageUrl + ")",
        }
        let state = this.state.productState;
        if (this.props.productState) {
          state = this.props.productState;
        }
        // console.log('--- product list item', this.props.product);
        return (
              <div className="col-lg-12">
                <ListGroupItem style={style}>
                  <div className="gradient-overlay">
                    <div className="header">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="title">
                            {this.showLabel(state)}
                            <h3>{this.props.product.label}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="body">
                      <div className="properties">
                        <span>
                          <i className="fa fa-map-marker" aria-hidden="true"></i>
                          &nbsp;
                          {this.props.product.productCity.name}
                        </span>
                        <span className="price">
                          {this.props.product.price !== 0 ? <i className="fa fa-eur" aria-hidden="true">&nbsp;</i> : undefined}
                          {this.props.product.price === 0 ? "Free!" : this.props.product.price}
                        </span>
                        <span className="buddy">
                          <Link to={`/profile/${this.props.product.refOwnerUserId}`}>{this.props.product.user.firstName + ' ' + this.props.product.user.lastName}</Link>
                        </span>
                      </div>
                      <div className="category">{this.props.product.categories.length !== 0 ? this.props.product.categories[0].name : undefined }</div>
                      <div className="description">{this.props.product.description}</div>

                    </div>
                  </div>
                  {this.renderByProductState(this.props.product.state)}
                </ListGroupItem>
                {this.props.product.state === "accepted" || this.props.product.state === "deactivated" ? undefined :
                <Panel collapsible expanded={this.state.expandTransactions}>
                    <MyRequestsTransactionList transactions={this.props.product.transactions}/>
                </Panel>
                }
              </div>
        );
    }
}

const mapStateToProps = (state) => {
  const { booking } = state;
  return {
    productId: booking.productId,
    productState: booking.productState
  };
}

export const MyRequestsListItem = connect(
  mapStateToProps
)(MyRequestsListItemRaw);
