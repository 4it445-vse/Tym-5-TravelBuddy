import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';


export class Item extends Component{

    render() {
        return (
          <ListGroupItem>
            <span>
              {this.props.product.label}
              {this.props.product.productCity.name}
              {this.props.product.price}
            </span>
            <Button type='submit' bsStyle="primary" onClick={() => {this.refs.detailProduct.open()}}>Detail</Button>
            <Button type='submit' bsStyle="primary">Weather</Button>
            <Button type='submit' bsStyle="primary">Reply</Button>
          </ListGroupItem>
        );
    }
}
