import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import { ItemList } from 'ItemList';
import api from '../../../api';

export class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: '',
                    products: {},
        };

        this.handleChange = this.handleChange.bind(this);
    }


    getSearchResult(searchText) {
            api.get();
    }

    getValidationState() {
        const length = this.state.searchTerm.length;
        if (length > 0) return 'success';
        if (length === 0) return 'error';
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value});
    }



    render() {
        return (
            <div className="container">
                <form>
                    <FormGroup controlId="searchForm" validationState={this.getValidationState()}>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                        <FormControl
                            type="text"
                            value={this.state.searchTerm}
                            placeholder="City, Product, Category, ...."
                            onChange={this.handleChange} on/>
                        <FormControl.Feedback/>
                        </InputGroup>
                    </FormGroup>
               </form>

                <div className="resultSet">
                    <ItemList products={this.state.products}/>
                </div>
            </div>
        );
    }
}