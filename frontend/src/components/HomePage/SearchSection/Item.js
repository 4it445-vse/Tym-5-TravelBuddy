import React, { Component } from 'react';
import {Row, Col, Button} from 'react-bootstrap';



export class Item extends Component{
    constructor(props) {
        super(props);

}
    render() {
        return (
          <Row className="show-grid">
              <Col xs={2} sm={2} md={2} >{this.props.product.productCity.name}</Col>
              <Col xs={2} sm={2} md={2} >{this.props.product.label}</Col>
              <Col xs={2} sm={2} md={2}>{this.props.product.price}</Col>
              <Col xs={2} sm={2} md={2}>
                  <Button type='submit' bsStyle="primary">Detail</Button>
              </Col>
              <Col xs={2} sm={2} md={2}>
                  <Button type='submit' bsStyle="primary">Reply</Button>
              </Col>

          </Row>
        );
    }
}