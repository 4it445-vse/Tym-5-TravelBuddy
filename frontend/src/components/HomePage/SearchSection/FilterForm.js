import React, {Component} from 'react';
import {Form,ControlLabel, Col, Button, InputGroup, FormGroup, FormControl, Panel} from 'react-bootstrap'
import {ItemList} from './ItemList';
import api from '../../../api';



export class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {products: [],
            errorMsg: '',};





        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.fetchProductData();
    }


    handleSubmit(event) {
        event.preventDefault();
        alert('Filtered text');
    }

    fetchProductData() {

        api.get("/Products?access_token=" + localStorage.getItem("accessToken"), {params: this.paramsForProducts})
            .then((response) => {
                if (response.status === 200) {
                    console.log("FilterForm - Response data",response.data);
                    this.setState({products: response.data});
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                console.log("Error: ", error.response);
            });

    }

    paramsForProducts() {
        return {
                filter: {
                    include: [
                        {relation: 'productCity'},
                        {relation: 'productProductCategories'}
                    ]
                },
                where: {name: {like: '%'}},
        };
    }


    render() {


        return (
            <div>
            <Panel>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <ControlLabel>Filter:</ControlLabel>
                    <FormGroup controlId="filterName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name:
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="Name..."/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="filterCity">
                        <Col componentClass={ControlLabel} sm={2}>
                           City:
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="City..."/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="filterPrice">
                        <Col componentClass={ControlLabel} sm={2}>
                            Price:
                        </Col>
                        <Col sm={10}>
                            <InputGroup>
                                <InputGroup.Addon>CZK</InputGroup.Addon>
                                <FormControl type="text" />
                                <InputGroup.Addon>between</InputGroup.Addon>
                                <FormControl type="text" />
                                <InputGroup.Addon>.00</InputGroup.Addon>
                            </InputGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">
                                Filter
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>

            <ItemList products={this.state.products}/>

            </div>
        );
    }
}