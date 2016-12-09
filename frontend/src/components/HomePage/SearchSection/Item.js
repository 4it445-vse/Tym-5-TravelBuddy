import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';


export class Item extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
          <ListGroupItem>
            <span>
              {this.props.product.label}
              {this.props.product.price}
              {this.props.product.description}
            </span>
            <Button type='submit' bsStyle="primary">Detail</Button>
            <Button type='submit' bsStyle="primary">Reply</Button>
          </ListGroupItem>
        );
    }
}
