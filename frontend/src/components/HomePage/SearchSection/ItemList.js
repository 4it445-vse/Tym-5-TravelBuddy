import React, { Component } from 'react';
import { Item } from './Item';
import { Alert, ListGroup } from 'react-bootstrap';


export class ItemList extends Component {

    render() {
        const productItems = this.props.products.map((product) => {
            return (
                <Item key={product.id} product={product}/>
            );
        });

        console.log("ItemList ",productItems);
        if (productItems.length > 0) {
            return (
                <div className="row">
                    <ListGroup>
                        {productItems}
                    </ListGroup>
                </div>
            );
        }
        else {
            return (
                <Alert bsStyle="warning">No records have been found!</Alert>
            );
        }
    }
}
