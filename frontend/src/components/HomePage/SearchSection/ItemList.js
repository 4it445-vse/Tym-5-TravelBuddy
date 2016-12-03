import React, {Component} from 'react';
import {Item} from './Item';
import { Table } from 'react-bootstrap';
import {FilterForm} from './FilterForm';


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

        console.log("ProductItems ",productItems);
        if (productItems.length > 0) {
            return (
                <div>
                    <div className="filterForm">
                        <FilterForm/>
                    </div>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th className="col-sm-2 col-md-2 col-lg-2">City</th>
                                <th className="col-sm-2 col-md-2 col-lg-2">Product label</th>
                                <th className="col-sm-2 col-md-2 col-lg-2">Price</th>
                                <th className="col-sm-2 col-md-2 col-lg-2">Product detail</th>
                                <th className="col-sm-2 col-md-2 col-lg-2">Reply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productItems}
                        </tbody>
                    </Table>
                </div>
            );
        }
        if (this.props.isFirst) {
            return (
                <Table bordered>
                    <tbody>
                    <tr>
                        <td colSpan="10" className="bg bg-info">Type keyword you desire to search!</td>
                    </tr>
                    </tbody>
                </Table>
            );
        }
        if (productItems.length == 0) {
            return (
                <Table bordered>
                    <tbody>
                        <tr>
                            <td colSpan="10" className="bg bg-danger">No records have been found!</td>
                        </tr>
                    </tbody>
                </Table>
            );
        }
    }
}