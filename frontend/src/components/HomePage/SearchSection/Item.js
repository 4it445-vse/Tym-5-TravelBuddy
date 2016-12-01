import React, { Component } from 'react';
import {Row, Col, Clearfix} from 'react-bootstrap';



export class Item extends Component{
    constructor(props) {
        super(props);

}
    render() {
        return (
          <Row className="show-grid">
              <Col xs={3} sm={3} md={3} >{this.props.product.label}</Col>
              <Col xs={3} sm={3} md={3}>{this.props.product.description}</Col>
              <Col xs={3} sm={3} md={3}>{this.props.product.price}</Col>

          </Row>
        );
    }
}