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
        return (
          <ListGroupItem>
            <span>
              {this.state.product.label}
              {this.state.product.productCity.name}
              {this.state.product.price}
            </span>
            <Button type='submit' bsStyle="primary" onClick={() => {this.state.modal.show(this.state.product,this.state.product.productCity,this.state.product.user,this.state.product.categories)}}>Detail</Button>
            <Button type='submit' bsStyle="primary">Reply</Button>
          </ListGroupItem>
        );
    }
}
