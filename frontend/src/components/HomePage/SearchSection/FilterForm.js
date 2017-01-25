import React, { Component } from 'react';
import InputRange from 'react-input-range';
import { Button, Panel, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import { ItemList } from './ItemList';
import api from '../../../api';
import _ from "lodash";
import 'react-select/dist/react-select.css';
import { CreateProductComponent } from "../../CreateProduct/CreateProductComponent.js";

export class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
          cityError: '',
          categoriesError: '',
          categories: [],
          selectedCategories: null,
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
          filterFormShow: false,
          showCreateProducts: false,
          isLoading: true,
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

    componentDidMount() {
        this.loadCategoriesEntries();
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
                    this.setState({ isLoading: false });
                    var filtered = response.data.filter(function (product) {
                        return product.user.isActive == true && product.user.id != localStorage.userId && product.state === "active";
                    });
                    console.log("FilterForm - Filtered data",filtered);
                    this.setState({products: filtered, filteredProducts: filtered});
                    this.updateInputRange(response.data);
                }
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                console.log("Error: ", error);
                console.log("Error: ", error.response);
            });
    }


    loadCategoriesEntries(){
        var categories = null;
        api.get('/ProductCategories?access_token=' + localStorage.accessToken)
            .then((response) => {
                // console.log("Product Categories:",response.data);
                if (response.status === 200){
                    categories = response.data;
                    const transformedCategories = categories.map((category)=>{
                        return {value:category.id, label:category.name};
                    });
                    this.setState({categories:transformedCategories});
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

                        include: ['productCity', 'user','categories']

                },
                limit: 1000
        };
    }

    handleSubmitFilterData(event) {
      event.preventDefault();
      this.setState({errorFromPrice: '', errorToPrice: ''});

      const {priceFrom}= this.state;
      const {priceTo} = this.state;
      const {label} = this.state;
      const {description} = this.state;
      const {city} = this.state;
      const categories = this.state.selectedCategories;

      let isValid = true;
      let isCity = false;
      let isCategory = false;
      if (city) {
          isCity = true;
      }

      if (categories && categories.length !== 0) {
          isCategory = true;
      }

      if (priceTo.length === 0) {
          this.setState({priceTo: 9999999});
      }
      if (priceFrom.length === 0) {
          this.setState({priceFrom: 0});
      }

      if (!this.isNumber(priceFrom) && priceFrom.length !== 0) {
          isValid = false;
          this.setState({errorFromPrice: 'Price from must be positive number!'});
      }

      if (!this.isNumber(priceTo) && priceTo.length !== 0) {
          isValid = false;
          this.setState({errorToPrice: 'Price to must be positive number!'});
      }

      var filteredProducts;
      if (isValid && isCity) {
        filteredProducts = this.state.products.filter(function (product) {
          if (isCategory) {
            var presented = false;
            for (var i = 0;i < categories.length;i++) {
              if(product.categories.length > 0 && categories[i].label === product.categories[0].name) {
                presented = true;
                break;
              }
            }
          }
          if (isCategory) {
            return product.price <= priceTo
              && product.label.toLowerCase().includes(label.toLowerCase())
              && product.price >= priceFrom
              && product.description.toLowerCase().includes(description.toLowerCase())
              && product.productCity.name.toLowerCase().includes(city.toLowerCase())
              && presented;
          } else {
            return product.price <= priceTo
              && product.label.toLowerCase().includes(label.toLowerCase())
              && product.price >= priceFrom
              && product.description.toLowerCase().includes(description.toLowerCase())
              && product.productCity.name.toLowerCase().includes(city.toLowerCase());
          }
        });
        this.setState({filteredProducts: filteredProducts});
      } else {
        filteredProducts = this.state.products.filter(function (product) {
          if (isCategory) {
            var presented = false;
            for (var i = 0;i < categories.length;i++) {
              if(product.categories.length > 0 && categories[i].label === product.categories[0].name) {
                presented = true;
                break;
              }
            }
          }
          if (isCategory) {
            return product.price <= priceTo
              && product.label.toLowerCase().includes(label.toLowerCase())
              && product.price >= priceFrom
              && product.description.toLowerCase().includes(description.toLowerCase())
              && presented;
          } else {
            return product.price <= priceTo
              && product.label.toLowerCase().includes(label.toLowerCase())
              && product.price >= priceFrom
              && product.description.toLowerCase().includes(description.toLowerCase());
          }
        });
        this.setState({filteredProducts: filteredProducts});
      }
    }

    isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    handleLabelChange(event) {
      event.preventDefault();
      this.setState({label: event.target.value})
    }

    handleCityChange(event, selected) {
      event.preventDefault();
      this.setState({city: selected.label});
      this.setState({selectedCity: selected.value})
    }

    handlePriceFromChange(event) {
      event.preventDefault();
      this.setState({priceFrom: event.target.value});
    }

    handleDescriptionChange(event) {
      event.preventDefault();
      this.setState({description: event.target.value});
    }

    handlePriceToChange(event) {
      event.preventDefault();
      this.setState({priceTo: event.target.value});
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

    handleReset(products) {
      this.setState({
        selectedCity: undefined,
        selectedCategories: undefined,
        label: "",
        description: "",
        priceFrom: this.state.inputRangeLimits.min,
        priceTo: this.state.inputRangeLimits.max,
        inputRangeLimits: {
          min: this.state.inputRangeLimits.min,
          max: this.state.inputRangeLimits.max
        },
        inputRangeValues: {
          min: this.state.inputRangeLimits.min,
          max: this.state.inputRangeLimits.max
        },
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
                <CreateProductComponent ref="createProductModal"/>
                <div className="filter-form">
                    <div className="row">
                      <div className="col-md-10 col-md-offset-1">
                      {
                        !this.state.isLoading ?
                          <div className="clearfix">
                            <Button type="button" className="btn-filter" onClick={ ()=> this.setState({ filterFormShow: !this.state.filterFormShow })}>
                              Filter&nbsp;
                              {this.state.filterFormShow ? <i className="fa fa-chevron-up" aria-hidden="true"></i> : <i className="fa fa-chevron-down" aria-hidden="true"></i>}
                            </Button>
                            <Button className="btn-offer-product" bsStyle="primary" onClick={() => {this.refs.createProductModal.show()}}>
                              <i className="fa fa-plus" aria-hidden="true">&nbsp;</i>Offer
                            </Button>
                          </div>
                          :
                          undefined
                      }
                      <Panel collapsible expanded={this.state.filterFormShow}>
                        <form className="form-horizontal" id="form-id" onSubmit={this.handleSubmitFilterData}>
                            <div className="form-group">
                              <div className="col-md-4 col-sm-6">
                                <input type="text" className="form-control" id="inputName" onChange={this.handleLabelChange} value={this.state.label} placeholder="Name"/>
                              </div>
                              <div className="col-md-4 col-sm-6">
                                <input type="text" className="form-control" id="inputDescription" onChange={this.handleDescriptionChange} value={this.state.description} placeholder="Description"/>
                              </div>
                              <div className="col-md-4">
                                <FormGroup controlId="inputCity" bsClass="" validationState={(this.state.cityError === "") ? null:"error"}>
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
                                <div className="col-sm-12 col-md-12">
                                    <FormGroup controlId="inputCategories" key="inputCategories" bsClass="" validationState={(this.state.categoriesError === "") ? null:"error"}>
                                        <Select
                                            name="selectFieldCategories"
                                            value={this.state.selectedCategories}
                                            onChange={(selected)=>{this.setState({selectedCategories: selected});}}
                                            multi={true}
                                            options={this.state.categories}
                                            placeholder="Categories"
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="form-group input-range-controls">
                              <div className="col-md-8 col-md-offset-2">
                                <div className="row">
                                    <div className="col-sm-3">
                                      <input type="text" className="form-control" onChange={this.handlePriceFromChange} id="priceFrom" value={this.state.priceFrom}/>
                                    </div>
                                    <div className="col-sm-6">
                                      <InputRange
                                        name="inputName"
                                        maxValue={this.state.inputRangeLimits.max}
                                        minValue={this.state.inputRangeLimits.min}
                                        value={this.state.inputRangeValues}
                                        onChange={this.handleInputRangeValuesChange}
                                      />
                                    </div>
                                    <div className="col-sm-3">
                                      <input type="text" className="form-control" onChange={this.handlePriceToChange} id="priceTo" value={this.state.priceTo}/>
                                    </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-center clearfix">
                                <button type="submit" className="btn btn-default">Search</button>
                                <button style={{marginLeft: "15px"}} type="button" onClick={() => this.handleReset()} className="btn btn-default">Reset</button>
                            </div>
                        </form>
                      </Panel>
                      </div>
                    </div>
                </div>
                {/*Status bar, unused for now @Martin*/}
                {/* <div className="status-bar">
                  <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                    Found: {this.state.filteredProducts.length}
                    </div>
                  </div>
                </div> */}
                <div className="item-list">
                  <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                      {
                        this.state.isLoading ?
                          <div className="loading-bar text-center"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
                          :
                          <ItemList products={this.state.filteredProducts} modal={this.props.modal}/>
                      }
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
