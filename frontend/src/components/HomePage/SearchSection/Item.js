import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';


export class Item extends Component{

    render() {
        //TODO clicking on item will fire up detail
        return (
          <div className="col-lg-4">
            <ListGroupItem>
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
                  <i className="fa fa-eur" aria-hidden="true"></i>
                  &nbsp;
                  {this.props.product.price}
                </span>
              </div>
              {/* <Button type='submit' bsStyle="primary">Detail</Button> */}
              {/* <Button type='submit' bsStyle="primary">Reply</Button> */}
            </ListGroupItem>
          </div>
        );
    }
}
