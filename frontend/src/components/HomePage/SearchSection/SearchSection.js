import React, {Component} from 'react';
import {FormGroup, FormControl, ControlLabel, Form} from 'react-bootstrap';
import { ItemList } from './'

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
    render() {

        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="searchForm" validationState={this.getValidationState()}>
                        <ControlLabel>Search:</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.searchTerm}
                            placeholder="City, Product, Category..."
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </Form>

                <div className="resultSet">
                    <ItemList products={this.state.products}></ItemList>
                </div>
            </div>

        );
    }
}