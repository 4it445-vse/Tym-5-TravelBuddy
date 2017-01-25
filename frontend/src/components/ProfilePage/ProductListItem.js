import React, { Component } from 'react';
import { Button, ButtonGroup, Panel, Label, ListGroupItem } from 'react-bootstrap';
import { TransactionList } from './TransactionList.js';
import { connect } from 'react-redux';
import { deactivateProductAction, activateProductAction } from '../Booking/actions.js';

export class ProductListItemRaw extends Component{

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
            <Label bsStyle="danger">{label}</Label>
          );
        default:
          break;

      }
    }

    handleDeactivate() {
      deactivateProductAction(this.props.product.id);
      this.setState({ controlButton: "deactivated" })
      this.setState({ productState: "deactivated" })
    }

    handleActivate() {
      activateProductAction(this.props.product.id);
      this.setState({ controlButton: "active" })
      this.setState({ productState: "active" })
    }

    render() {
        var imageUrl = "/api/containers/productPictures/download/"+this.props.product.picture +"?access_token="+localStorage.accessToken;
        var style = {
          backgroundImage: "url(" + imageUrl + ")",
        }
        const acceptedTxn = this.props.product.transactions;
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
                      </div>
                      <div className="category">{this.props.product.categories.length !== 0 ? this.props.product.categories[0].name : undefined }</div>
                      <div className="description">{this.props.product.description}</div>

                    </div>
                  </div>
                  {
                    this.props.product.state === "accepted"
                    ?
                    <TransactionList transactions={acceptedTxn} type="accepted"/>
                    :
                    <div className="footer container-fluid gradient-overlay">
                      <div className="col-md-3">

                      </div>
                      <div className="col-md-3">

                      </div>
                      <div className="col-md-6 text-right">
                        <ButtonGroup style={{marginRight: "15px"}}>
                          {this.state.controlButton === "active" ?
                            <Button onClick={this.handleDeactivate.bind(this)} bsStyle="primary">Deactive</Button>
                            :
                            <Button onClick={this.handleActivate.bind(this)} bsStyle="primary">Activate</Button>
                          }
                        </ButtonGroup>
                        <ButtonGroup>
                          {this.props.product.transactions.length === 0 ?
                          <Button bsStyle="default">No requests</Button>
                          :
                          <Button type="button" className="btn btn-primary" onClick={ ()=> this.setState({ expandTransactions: !this.state.expandTransactions })}>
                            Show Requests ({this.props.product.transactions.length})&nbsp;{this.state.expandTransactions ? <i className="fa fa-chevron-up" aria-hidden="true"></i> : <i className="fa fa-chevron-down" aria-hidden="true"></i>}
                          </Button>
                          }
                        </ButtonGroup>
                      </div>
                    </div>
                  }
                </ListGroupItem>
                {this.props.product.state === "accepted" ? undefined :
                <Panel collapsible expanded={this.state.expandTransactions}>
                    <TransactionList transactions={this.props.product.transactions}/>
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

export const ProductListItem = connect(
  mapStateToProps
)(ProductListItemRaw);
