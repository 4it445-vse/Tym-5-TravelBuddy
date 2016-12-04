import React, {Component} from 'react';
import {ItemList} from './ItemList';
import api from '../../../api';



export class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {products: [],
            filteredProducts: [],
            errorToPrice: '',
            errorFromPrice:'',
            label: '',
            description: '',
            city: '',
            priceFrom: 0,
            priceTo: 9999999};



        this.fetchProductData();
        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handlePriceFromChange = this.handlePriceFromChange.bind(this);
        this.handlePriceToChange = this.handlePriceToChange.bind(this);
        this.handleSubmitFilterData = this.handleSubmitFilterData.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    componentWillMount() {
        //this.fetchProductData();
    }




    fetchProductData() {

        api.get("/Products?access_token=" + localStorage.getItem("accessToken"), {params: this.paramsForSearchTerm})
            .then((response) => {
                if (response.status === 200) {
                    console.log("FilterForm - Response data",response.data);
                    this.setState({products: response.data, filteredProducts: response.data});
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                console.log("Error: ", error.response);
            });

    }

    paramsForSearchTerm() {
        return {
                filter: {
                    include: [
                        {relation: 'productCity'}
                    ],
                },
                limit: 1000
        };
    }

    handleSubmitFilterData(event) {
        event.preventDefault();
        this.setState({errorFromPrice: '', errorToPrice: ''});

        const { priceFrom }= this.state;
        const { priceTo } = this.state;
        const { label } = this.state;
        const { description } = this.state;

        let isValid = true;

        if (priceTo.length == 0) {
            this.setState({priceTo: 9999999});
        }
        if (priceFrom.length == 0) {
            this.setState({priceFrom: 0});
        }

        if(!this.isNumber(priceFrom) && priceFrom.length != 0) {
            isValid = false;
            this.setState({errorFromPrice: 'Price from must be positive number!'});
        }

        if(!this.isNumber(priceTo) && priceTo.length != 0) {
            isValid = false;
            this.setState({errorToPrice: 'Price to must be positive number!'});
        }

        if (isValid) {
            var filteredProducts = this.state.products.filter(function (product) {
                return product.price <= priceTo &&
                    product.label.includes(label) &&
                    product.price >= priceFrom &&
                    product.description.includes(description);
            });
            this.setState({filteredProducts: filteredProducts});
            console.log("FilteredProducts", filteredProducts);
        } else {

        }
    }

    isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
    }

    handleLabelChange(event) {
        event.preventDefault();
        console.log("LabelState",this.state.label);
        this.setState({label: event.target.value})
    }

    handleCityChange(event) {
        event.preventDefault();
        console.log("CityState:",this.state.city);
        this.setState({city: event.target.value})
    }

    handlePriceFromChange(event) {
        event.preventDefault();
        console.log("PriceFromState:",this.state.priceFrom);
        this.setState({priceFrom: event.target.value})
    }

    handleDescriptionChange(event){
        event.preventDefault();
        console.log("PriceToState:",this.state.description);
        this.setState({description: event.target.value})
    }

    handlePriceToChange(event) {
        event.preventDefault();
        console.log("PriceToState:",this.state.priceTo);
        this.setState({priceTo: event.target.value})
    }

    render() {


        return (
            <div>
                <div className="container">
                    <div className="row">
                    <form className="form-horizontal" onSubmit={this.handleSubmitFilterData}>
                        <div className="form-group row">
                            <label classID="inputName" className="col-sm-2 col-form-label">Label:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="inputName" onChange={this.handleLabelChange} placeholder="Label..."/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label classID="inputName" className="col-sm-2 col-form-label">Description:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="inputName" onChange={this.handleDescriptionChange} placeholder="Description..."/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label classID="inputCity" className="col-sm-2 col-form-label">City:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="inputCity" onChange={this.handleCityChange} placeholder="City..."/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label classID="priceFrom" className="col-sm-2 col-form-label">Price:</label>
                            <div className="col-sm-8">
                                <div className="input-group">
                                    <div className="input-group-addon">CZK</div>
                                    <input type="text" className="form-control" onChange={this.handlePriceFromChange} id="priceFrom"/>
                                    <div className="input-group-addon">between</div>
                                    <input type="text" className="form-control" onChange={this.handlePriceToChange} id="priceTo"/>
                                    <div className="input-group-addon">.00</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                                {this.state.errorToPrice != '' ? <span className="col-sm-offset-2 col-sm-8 alert alert-danger">{this.state.errorToPrice}</span> : null}
                                {this.state.errorFromPrice != '' ? <span className="col-sm-offset-2 col-sm-8 alert alert-danger">{this.state.errorFromPrice}</span> : null}

                        </div>

                        <div className="form-group row">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default">Filter</button>
                            </div>
                        </div>
                    </form>
                    </div>
                    <div className="row"></div>

            <ItemList products={this.state.filteredProducts}/>
                </div>

            </div>
        );
    }
}