import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';

export class Item extends Component{
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            modal: props.modal,
        };

        this.findModal();

    }



    findModal() {
        //TODO return modal object
    }

    render() {
        var imageUrl = "/api/containers/productPictures/download/"+this.props.product.picture +"?access_token="+localStorage.accessToken;
        var style = {
          backgroundImage: "url(" + imageUrl + ")",
        }
        return (
          <div className="item col-md-4">
            <ListGroupItem style={style}>
              <div className="title">
                <h3>{this.props.product.label}</h3>
              </div>
              <div className="body">
              </div>
              <div className="footer">
                <span className="text-left">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  &nbsp;
                  {this.props.product.productCity.name}
                </span>
                <span className="text-right">
                  {this.props.product.price !== 0 ? <i className="fa fa-eur" aria-hidden="true">&nbsp;</i> : undefined}
                  {this.props.product.price === 0 ? "Free!" : this.props.product.price}
                </span>
              </div>
              <div
                className="wrapper-overlay text-center"
                onClick={() => {
                    this.state.modal.getWrappedInstance().show(
                      this.state.product,
                      this.state.product.productCity,
                      this.state.product.user,
                      this.state.product.categories
                    )
                  }}>
                <span><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></span>
              </div>
            </ListGroupItem>
          </div>
        );
    }
}
