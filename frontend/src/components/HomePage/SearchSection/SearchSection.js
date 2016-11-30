import React, {Component} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import { ItemList } from './ItemList';
import api from '../../../api';

export class SearchSection extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: '',
                    products: [],
       };
        this.handleChange = this.handleChange.bind(this);

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
                <form onSubmit={this.fetchProductData(this.state.searchTerm)}>
                    <FormGroup role="form" controlId="searchForm" validationState={this.getValidationState()}>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                        <FormControl
                            type="text"
                            value={this.state.searchTerm}
                            placeholder="City, Product, Category, ...."
                            onChange={this.handleChange}

                        />
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