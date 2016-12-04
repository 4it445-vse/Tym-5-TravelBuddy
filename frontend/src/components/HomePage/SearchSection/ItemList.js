import React, {Component} from 'react';
import {Item} from './Item';
import { Table } from 'react-bootstrap';


export class ItemList extends Component {
    constructor(props) {
        super(props);

    }

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
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th className="col-sm-2 col-md-2 col-lg-2">Product label</th>
                            <th className="col-sm-2 col-md-2 col-lg-2">Price</th>
                            <th className="col-sm-4 col-md-4 col-lg-4">Description</th>
                            <th className="col-sm-2 col-md-2 col-lg-2 text-center">Product detail</th>
                            <th className="col-sm-2 col-md-2 col-lg-2 text-center">Reply</th>
                        </tr>
                        </thead>
                        <tbody>
                            {productItems}
                        </tbody>
                    </Table>
                </div>
            );
        }
        else {
            return (
                <Table bordered>
                    <tbody>
                        <tr>
                            <td colSpan="10" className="bg bg-dark">No records have been found!</td>
                        </tr>
                    </tbody>
                </Table>
            );
        }
    }
}