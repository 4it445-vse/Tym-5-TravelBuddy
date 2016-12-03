import React, {Component} from 'react';
import {Form, FormGroup, FormControl, InputGroup, Glyphicon, Button} from 'react-bootstrap';
import {ItemList} from './ItemList';
import {DetailProduct} from '../DetailProduct/DetailProduct';
import {FilterForm} from './FilterForm';
import api from '../../../api';

export class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            products: [],
            errorMsg: '',
            showCreateProducts: false,
            firstSearch: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        console.log(event);

        if (this.state.searchTerm.length > 0) {
            const searchTerm = this.state.searchTerm;
            console.log(searchTerm);
            this.fetchProductData(searchTerm);
            console.log(this.state.products);

            this.setState({searchTerm: '',firstSearch:false});
        } else {
            this.setState({errorMsg: 'Enter searched text!'});
        }

    }

    getValidationState() {
        const length = this.state.searchTerm.length;
        if (length > 0) return 'success';
        if (length === 0) return 'error';
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    fetchProductData(searchTerm) {

        if (searchTerm.length > 0) {

            api.get("/Products?access_token=" + localStorage.getItem("accessToken"), {params: this.paramsForSearchTerm(searchTerm)})
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Response data",response.data);

                        this.setState({products: response.data});
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    console.log("Error: ", error.response);
                });
        } else {
            this.setState({
                    products: []
                }
            );
        }
    }

    paramsForSearchTerm(searchTerm) {
        if (!searchTerm) return {};
        else {
            return {
                    filter: {
                        include: [
                            {relation: 'productCity', scope: {fields:['name']}},
                            {relation: 'productProductCategories'}
                        ],
                        where: {
                            or: [
                                {label: {like: "%" + searchTerm + "%"}},
                                {description: {like: "%" + searchTerm + "%"}},
                                {price: {like: "%" + searchTerm + "%"}},
                            ]
                        },
                       /* fields: {
                            id: true, label: true, description: true, price: true
                        },*/
                    },
                    limit: 100
                };
        }
    }


    render() {

        return (
            <div className="container">
                <DetailProduct ref="detailProduct"/>
                <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup controlId="searchForm" validationState={this.getValidationState()}>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                            <FormControl
                                type="text"
                                value={this.state.searchTerm}
                                placeholder="City..."
                                onChange={this.handleChange}/>
                            <InputGroup.Button>
                                <Button type='submit' bsStyle="primary">Search</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                </Form>

                    <ItemList isFirst={this.state.firstSearch} products={this.state.products}/>
            </div>
        );
    }
}