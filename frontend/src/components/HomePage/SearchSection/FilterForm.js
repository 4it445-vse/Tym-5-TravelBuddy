import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { Panel, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import { ItemList } from './ItemList';
import api from '../../../api';
import _ from "lodash";
import 'react-select/dist/react-select.css';

export class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cityError: '',
            selectedCity: null,
            cities: [],
            products: [],
            filteredProducts: [],
            errorToPrice: '',
            errorFromPrice:'',
            label: '',
            description: '',
            city: '',
            priceFrom: 0,
            priceTo: 9999999,
            inputRangeValues: {
            min: 0,
            max: 9999,
          },
            inputRangeLimits: {
            min: 0,
            max: 100,
          },
            filterFormShow: true,
        };

        this.fetchProductData();
        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handlePriceFromChange = this.handlePriceFromChange.bind(this);
        this.handlePriceToChange = this.handlePriceToChange.bind(this);
        this.handleSubmitFilterData = this.handleSubmitFilterData.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleInputRangeValuesChange = this.handleInputRangeValuesChange.bind(this);
        this.fetchCityDataDebounced = _.debounce(this.fetchCityData, 300);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    fetchCityData(searchTerm, callback){
        if (searchTerm.length === 0){callback(null,null);return;}
        api.get('/cities?access_token='+localStorage.accessToken, {params: this.paramsForSearchTermCity(searchTerm)})
            .then((response) =>{
                if (response.status === 200){
                    let cities = response.data;
                    const transformedCities = cities.map((city)=>{
                        return {value:city.id, label:city.name};
                    });
                    callback(null,{options: transformedCities, complete:true});
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                console.log("Error: ", error.response);
                callback(error,null);
            });
    }

    fetchProductData() {
        api.get("/Products?access_token=" + localStorage.getItem("accessToken"), {params: this.paramsForSearchTerm()})
            .then((response) => {
                if (response.status === 200) {
                    console.log("FilterForm - Response data",response.data);
                    this.setState({products: response.data, filteredProducts: response.data});
                    this.updateInputRange(response.data);
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                console.log("Error: ", error.response);
            });
    }

    paramsForSearchTermCity(searchTerm){
        if (!searchTerm) return {};
        else{
            return {
                filter:{
                    where:{
                        name:{
                            like: "%"+searchTerm+"%"
                        }
                    },
                    limit: 5
                }
            };
        }
    }

    paramsForSearchTerm() {
        return {
                filter: {
                        include: {
                            relation: 'productCity',
                        },
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
        const { city } = this.state;
        let isValid = true;
        let isCity = false;

        if (city) {
            isCity = true;
        }

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

        if (isValid && isCity) {
            var filteredProducts = this.state.products.filter(function (product) {
                return product.price <= priceTo &&
                    product.label.toLowerCase().includes(label.toLowerCase()) &&
                    product.price >= priceFrom &&
                    product.description.toLowerCase().includes(description.toLowerCase()) &&
                    product.productCity.name.toLowerCase().includes(city.toLowerCase());
            });
            this.setState({filteredProducts: filteredProducts});
            console.log("FilteredProducts", filteredProducts);
        } else {
            var filteredProducts = this.state.products.filter(function (product) {
                return product.price <= priceTo &&
                    product.label.toLowerCase().includes(label.toLowerCase()) &&
                    product.price >= priceFrom &&
                    product.description.toLowerCase().includes(description.toLowerCase());
            });
            this.setState({filteredProducts: filteredProducts});
            console.log("FilteredProducts", filteredProducts);
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

    handleCityChange(event, selected) {
        event.preventDefault();
        console.log("CityState:",this.state.selectedCity);
        console.log("SelectCityObject", selected);
        this.setState({city: selected.label});
        this.setState({selectedCity: selected.value})
    }

    handlePriceFromChange(event) {
        event.preventDefault();
        console.log("PriceFromState:",this.state.priceFrom);
        this.setState({priceFrom: event.target.value});
        // this.setState({inputRangeValues: {min: event.target.value}});
    }

    handleDescriptionChange(event){
        event.preventDefault();
        console.log("PriceToState:",this.state.description);
        this.setState({description: event.target.value});
    }

    handlePriceToChange(event) {
        event.preventDefault();
        console.log("PriceToState:",this.state.priceTo);
        this.setState({priceTo: event.target.value});
        // this.setState({inputRangeValues: {max: event.target.value}});
    }

    handleInputRangeValuesChange(component, values) {
      this.setState({
        inputRangeValues: values,
      });
      this.setState({
        priceFrom: values.min,
        priceTo: values.max
      });
    }

    updateInputRange(products) {
      let prices = [];
      for (let item of products) {
        prices.push(item.price);
      }
      let priceMin = Math.min.apply(Math, prices);
      let priceMax = Math.max.apply(Math, prices)
      this.setState({
        inputRangeLimits: {min: priceMin, max: priceMax},
        inputRangeValues: {min: priceMin, max: priceMax}
      });
      this.setState({
        priceFrom: priceMin,
        priceTo: priceMax,
      });
    }

    render() {


        return (
            <div>
                <div className="container filter-form">
                    <div className="row">
                      <div className="col-lg-8 col-lg-offset-2">
                      <Panel collapsible expanded={this.state.filterFormShow}>
                        <form className="form-horizontal" onSubmit={this.handleSubmitFilterData}>
                            <div className="form-group row">
                              <div className="col-lg-6">
                                <input type="text" className="form-control" id="inputName" onChange={this.handleLabelChange} placeholder="Name"/>
                              </div>
                              <div className="col-lg-6">
                                <input type="text" className="form-control" id="inputName" onChange={this.handleDescriptionChange} placeholder="Description"/>
                              </div>

                            </div>
                            <div className="row form-group">
                                <div className="col-lg-12">
                                  <FormGroup controlId="inputCity" bsClass="selectCityBox" validationState={(this.state.cityError === "") ? null:"error"}>
                                      <Select.Async
                                          name="selectFieldCity"
                                          value={this.state.selectedCity}
                                          onChange={(selected)=>{this.handleCityChange(event, selected)}}
                                          multi={false}
                                          loadOptions={(input, callback)=>{this.fetchCityDataDebounced(input,callback)}}
                                          placeholder="City"
                                      />
                                  </FormGroup>
                                </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-lg-12">
                                <InputRange
                                  name="inputName"
                                  // classNames=""
                                  maxValue={this.state.inputRangeLimits.max}
                                  minValue={this.state.inputRangeLimits.min}
                                  value={this.state.inputRangeValues}
                                  onChange={this.handleInputRangeValuesChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-lg-offset-3">
                                <div className="input-group">
                                    <div className="input-group-addon">Price from</div>
                                    <input type="text" className="form-control" onChange={this.handlePriceFromChange} id="priceFrom" value={this.state.priceFrom}/>
                                    <div className="input-group-addon">to</div>
                                    <input type="text" className="form-control" onChange={this.handlePriceToChange} id="priceTo" value={this.state.priceTo}/>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              {this.state.errorToPrice != '' ? <span className="col-sm-offset-2 col-sm-8 alert alert-danger">{this.state.errorToPrice}</span> : null}
                              {this.state.errorFromPrice != '' ? <span className="col-sm-offset-2 col-sm-8 alert alert-danger">{this.state.errorFromPrice}</span> : null}
                                {this.state.cityError != '' ? <span className="col-sm-offset-2 col-sm-8 alert alert-danger">{this.state.cityError}</span> : null}
                            </div>

                            <div className="form-group row">
                              <button type="submit" className="btn btn-primary center-block">Filter</button>
                            </div>
                        </form>
                      </Panel>
                      </div>
                    </div>
                </div>
                <div className="container item-list">
                  <div className="row">
                    <div className="col-lg-8 col-lg-offset-2">
                    <Panel>
                      <ItemList products={this.state.filteredProducts}/>
                    </Panel>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
