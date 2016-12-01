import React, {Component} from 'react';

import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import { ItemList } from './ItemList';
import api from '../../../api';

export class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: '',
        products:[]};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getValidationState() {
        const length = this.state.searchTerm.length;
        if (length > 0) {
            return 'success';
        }
        else {
            return 'error';
        }
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value });

    }

    handleSubmit(event) {
        event.preventDefault();

        if (event.keyPress == 13) {
            alert('Enter has been pressed!');
        }

        this.setState({searchTerm : ''});
    }


    getValidationState() {
        const length = this.state.searchTerm.length;
        if (length > 0) return 'success';
        if (length === 0) return 'error';
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    fetchProductData(searchTerm){

        if (searchTerm.length > 0){

            api.get("/products", {params: this.paramsForSearchTerm(searchTerm)})
                .then((response) =>{
                    if (response.status === 200){
                        this.setState({products: response.data});
                    }
                })
                .catch((error) => {
                    console.log("Error: ", error);
                    console.log("Error: ", error.response);
                });
        }else{
            this.setState({
                products: []}
                );
        }
    }

    paramsForSearchTerm(searchTerm){
        if (!searchTerm) return {};
        else{
            return {
                filter:{
                    where:{
                        label:{
                            like: "%"+searchTerm+"%"
                        }
                    },
                    limit: 100
                }
            };
        }
    }

    render() {
        return (
            <div className="container">

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="searchForm" validationState={this.getValidationState()}>
                        <ControlLabel>Search:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                        <FormControl
                            type="text"
                            value={this.state.searchTerm}
                            placeholder="City, Product, Category..."
                            onChange={this.handleChange}
                        />
                        </InputGroup>
                    </FormGroup>
                </Form>


                <div className="resultSet">
                    <ItemList products={this.state.products}/>
                </div>
            </div>

        );
    }
}