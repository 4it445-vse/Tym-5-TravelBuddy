import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';



export class ProductListItem extends Component{
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Row className="show-grid">
                <Col xs={2} sm={2} md={2} >{this.props.product.label}</Col>
                <Col xs={3} sm={3} md={3}>{this.props.product.description}</Col>
                <Col xs={2} sm={2} md={2}>{this.props.product.price}</Col>
                <Col xs={2} sm={2} md={2}>
                    <Button type='submit' bsStyle="primary">Request</Button>
                </Col>
            </Row>
        );
    }
}