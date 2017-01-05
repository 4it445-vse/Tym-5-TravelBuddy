import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import {ReactDOM} from 'react-dom';


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

        console.log("Modal ", this.state.modal);

    }

    render() {
        //TODO clicking on item will fire up detail
        return (
          <div className="item col-md-4">
            <ListGroupItem>
              <div className="title">
                <h3>{this.props.product.label}</h3>
              </div>
              <div className="body">
                {this.props.product.description}
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
              <div className="wrapper-overlay text-center" onClick={() => {this.state.modal.show(this.state.product,this.state.product.productCity,this.state.product.user,this.state.product.categories)}}>
                <span><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></span>
				        {/* <Button type='submit' bsStyle="primary" onClick={() => {this.state.modal.show(this.state.product,this.state.product.productCity,this.state.product.user,this.state.product.categories)}}>Detail</Button> */}
              </div>
              {/* <Button type='submit' bsStyle="primary">Detail</Button> */}
              {/* <Button type='submit' bsStyle="primary">Reply</Button> */}
            </ListGroupItem>
          </div>
        );
    }
}
