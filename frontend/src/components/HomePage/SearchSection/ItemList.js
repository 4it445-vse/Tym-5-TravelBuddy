import React, { Component } from 'react';
import { Item } from './Item';
import { Alert, ListGroup } from 'react-bootstrap';


export class ItemList extends Component {

    render() {
        const productItems = this.props.products.map((product) => {
            return (
                <Item key={product.id} product={product} modal={this.props.modal}/>
            );
        });
        if (productItems.length > 0) {
            return (
                <div className="row">
                    <ListGroup className="clearfix">
                        {productItems}
                    </ListGroup>
                </div>
            );
        }
        else {
            return (
                <Alert bsStyle="danger"><i className="fa fa-exclamation-triangle"></i><span>No records have been found!</span></Alert>
            );
        }
    }
}
