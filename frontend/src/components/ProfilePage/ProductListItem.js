import React, { Component } from 'react';
import { Button, ButtonGroup, ListGroupItem } from 'react-bootstrap';



export class ProductListItem extends Component{

    render() {
        var imageUrl = "/api/containers/productPictures/download/"+this.props.product.picture +"?access_token="+localStorage.accessToken;
        var style = {
          backgroundImage: "url(" + imageUrl + ")",
        }
        return (
            <div style={{marginLeft: "0%"}}>
              <div className="col-lg-12">
                <ListGroupItem style={style}>
                  <div className="title">
                    <h3>{this.props.product.label}</h3>
                  </div>
                  <div className="body">
                    <p>{this.props.product.categories.length !== 0 ? this.props.product.categories[0].name : undefined }</p>
                    {this.props.product.description}
                  </div>
                  <div className="footer container-fluid">
                    <div className="col-md-3">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      &nbsp;
                      {this.props.product.productCity.name}
                    </div>
                    <div className="col-md-3">
                      {this.props.product.price !== 0 ? <i className="fa fa-eur" aria-hidden="true">&nbsp;</i> : undefined}
                      {this.props.product.price === 0 ? "Free!" : this.props.product.price}
                    </div>
                    <div className="col-md-2">
                      Status:&nbsp;{this.props.product.state}
                    </div>
                    <div className="col-md-4">
                      <ButtonGroup>
                        <Button bsStyle="primary">Deactive</Button>
                      </ButtonGroup>
                    </div>

                  </div>
                  {/* <div className="wrapper-overlay text-center" onClick={() => {this.state.modal.show(this.state.product,this.state.product.productCity,this.state.product.user,this.state.product.categories)}}>
                    <span><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></span>
    				        <Button type='submit' bsStyle="primary" onClick={() => {this.state.modal.show(this.state.product,this.state.product.productCity,this.state.product.user,this.state.product.categories)}}>Detail</Button>
                  </div> */}
                  {/* <Button type='submit' bsStyle="primary">Detail</Button> */}
                  {/* <Button type='submit' bsStyle="primary">Reply</Button> */}
                </ListGroupItem>
              </div>
            </div>
        );
    }
}
