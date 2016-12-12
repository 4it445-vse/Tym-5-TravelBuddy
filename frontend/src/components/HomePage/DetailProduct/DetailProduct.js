import React, {Component} from 'react';
import { Button, Modal, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../../../actions/index';
import { WeatherList } from '../../Weather/WeatherList';



export class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            product: [],
            user: [],
            city:[],
            categories:[],

        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show(product,city,user,categories){
        console.log("Product", product);
        console.log("User",user);
        console.log("City", city);
        console.log("Categories", categories);
        this.setState({ show:true,
            product:product,
            user:user,
            city:city,
            categories:categories});
    }

    hide(){
        this.setState({ show:false });
    }
    returnCategories() {
        var categoriesString = '';
        for (var i = 0; i < this.state.categories.length; i++) {
            categoriesString = categoriesString + this.state.categories[i].name + ',';
        }

        return categoriesString.substr(0, categoriesString.length-1);
    }
    render() {
        return(

            <Modal
                show={this.state.show}
                bsSize="large"
                onHide={this.hide}>

                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">Product detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="productLabel">
                            <Col componentClass={ControlLabel} sm={2}>
                                Buddy:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" value={`${this.state.user.firstName} ${this.state.user.lastName}`} disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="productLabel">
                            <Col componentClass={ControlLabel} sm={2}>
                                Product label:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" value={this.state.product.label} disabled/>
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
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {this.hide()}} bsSize="small">Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
