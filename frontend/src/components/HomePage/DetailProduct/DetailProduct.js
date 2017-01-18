import React, {Component} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { WeatherList } from '../../Weather/WeatherList';
import api from '../../../api.js';

export class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            product: [],
            user: [],
            city:[],
            categories:[],
            ownerProfilePicture: undefined

        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

    }

    show(product, city, user, categories) {
        // console.log("Product", product);
        // console.log("User",user);
        // console.log("City", city);
        // console.log("Categories", categories);
        this.setState({ show:true,
            product:product,
            user:user,
            city:city,
            categories:categories});

        this.updateViews(product.id);
        this.getOwnerProfilePicture(product.user.id);
    }

    hide() {
        this.setState({ show:false });
    }

    updateViews(productId) {
      const srvUrl = '/Products/' + productId + '?access_token=' + localStorage.accessToken;
      api.get(srvUrl)
        .then(({data})=> {
          api.patch(srvUrl, {"views": data.views + 1}).then(({data})=> {

          }).catch((error)=> {
            console.log('<!> updateViews', error);
          });
        })
        .catch((error)=> {
          console.log('<!> updateViews', error);
        });
    }

    returnCategories() {
        var categoriesString = '';
        for (var i = 0; i < this.state.categories.length; i++) {
            categoriesString = categoriesString + this.state.categories[i].name + ',';
        }

        return categoriesString.substr(0, categoriesString.length-1);
    }

    getOwnerProfilePicture(ownerId) {
        const srvUrl = '/UserDetails?access_token=' + localStorage.accessToken;
        let params = {params: {filter: {fields: {profilePicture: true}}, where: {refUserMainId: ownerId}}};
        api.get(srvUrl, params).then((response) => {
            if (response.status === 200) {
              // console.log("Success: ", response);
              this.setState({ ownerProfilePicture: response.data[0].profilePicture });
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    render() {
        let productImageUrl = "/api/containers/productPictures/download/"+this.state.product.picture;
        let productStyle = {
          backgroundImage: "url(" + productImageUrl + ")",
        }
        let ownerPictureUrl = "/api/containers/profilePictures/download/"+this.state.ownerProfilePicture;
        let ownerStyle = {
          backgroundImage: "url(" + ownerPictureUrl + ")",
        }
        return(

            <Modal
                show={this.state.show}
                bsSize="large"
                onHide={this.hide}
                className="detail-product"
                >
                <Modal.Header style={productStyle}>
                    <Modal.Title id="modal-title">{this.state.product.label}</Modal.Title>
                    <span className="price">
                      {this.state.product.price !== 0 ? <i className="fa fa-eur" aria-hidden="true">&nbsp;</i> : undefined}
                      {this.state.product.price === 0 ? "Free!" : this.state.product.price}
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <div className="info-bar">
                      <div className="profile-picture" style={ownerStyle}></div>
                      <span className="name">
                        {`${this.state.user.firstName} ${this.state.user.lastName}`}
                      </span>
                      <span className="city">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        &nbsp;
                        {this.state.city.name}
                      </span>
                      <span className="category">
                        {this.returnCategories()}
                      </span>
                    </div>
                    <div className="">
                      <p className="description">{this.state.product.description}</p>
                    </div>
                    {/* <Form horizontal>
                        <FormGroup controlId="productLabel">
                            <Col componentClass={ControlLabel} sm={2}>
                                Buddy:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" value={`${this.state.user.firstName} ${this.state.user.lastName}`} disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="productCity">
                            <Col componentClass={ControlLabel} sm={2}>
                                Category:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" value={this.returnCategories()} disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="productCity">
                            <Col componentClass={ControlLabel} sm={2}>
                                City:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" value={this.state.city.name} disabled/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="productPrice">
                            <Col componentClass={ControlLabel} sm={2}>
                                Price:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" value={this.state.product.price} disabled/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="productDescription">
                            <Col componentClass={ControlLabel} sm={2}>
                                Description:
                            </Col>
                            <Col sm={10}>
                                <FormControl componentClass="textArea" value={this.state.product.description} disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="weatherData">
                            <Col sm={12}>
                                <WeatherList cityName={this.state.city.name}/>
                            </Col>
                        </FormGroup>
                    </Form> */}
                    <WeatherList cityName={this.state.city.name}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {this.hide()}}>Cancel</Button>
                    <Button type='button' bsStyle="primary">Reply</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
