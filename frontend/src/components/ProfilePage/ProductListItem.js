import React, { Component } from 'react';
import {Row, Col, Button, ListGroupItem} from 'react-bootstrap';



export class ProductListItem extends Component{

    render() {
        return (
            // <Row className="show-grid">
            //     <Col xs={2} sm={2} md={2} >{this.props.product.label}</Col>
            //     <Col xs={3} sm={3} md={3}>{this.props.product.description}</Col>
            //     <Col xs={2} sm={2} md={2}>{this.props.product.price}</Col>
            //     <Col xs={2} sm={2} md={2}>
            //         <Button type='submit' bsStyle="primary">Request</Button>
            //     </Col>
            // </Row>
            <div className="col-lg-4">
              <ListGroupItem>
                <div className="title">
                  <h3>{this.props.product.label}</h3>
                </div>
                <div className="body">
                  {this.props.product.description}
                </div>
                <div className="footer">
                  <span className="text-left">
                    {/* <i className="fa fa-map-marker" aria-hidden="true"></i>
                    &nbsp;
                    {this.props.product.productCity.name} */}
                  </span>
                  <span className="text-right">
                    {this.props.product.price !== 0 ? <i className="fa fa-eur" aria-hidden="true">&nbsp;</i> : undefined}
                    {this.props.product.price === 0 ? "Free!" : this.props.product.price}
                  </span>
                </div>
                {/* <div className="wrapper-overlay text-center" onClick={() => {this.state.modal.show(this.state.product,this.state.product.productCity,this.state.product.user,this.state.product.categories)}}>
                  <span><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></span>
  				        <Button type='submit' bsStyle="primary" onClick={() => {this.state.modal.show(this.state.product,this.state.product.productCity,this.state.product.user,this.state.product.categories)}}>Detail</Button>
                </div> */}
                {/* <Button type='submit' bsStyle="primary">Detail</Button> */}
                {/* <Button type='submit' bsStyle="primary">Reply</Button> */}
              </ListGroupItem>
            </div>
        );
    }
}
