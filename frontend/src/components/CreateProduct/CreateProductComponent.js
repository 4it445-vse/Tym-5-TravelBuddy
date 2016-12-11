import React, { Component } from 'react';
import { Button, Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, InputGroup,ListGroup,ListGroupItem, Dropdown, MenuItem, Col,HelpBlock } from 'react-bootstrap';
import api from '../../api.js';
import lodash from "lodash";
import ReactDOM from 'react-dom';

import Select from 'react-select';



export class CreateProductComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      //form data---
      show: false,
      showDropdown: false,
      formHelperData: {
        categories: []
        //cities: []
      },

      labelError: "",
      categoryError: "",
      cityError: "",
      priceError:"",
      //-----

      //product data----
      label: "",
      selectedCategory: null, //categoryID
      selectedCity: null, // cityID
      description: "",
      price: 0
      //-----
    }

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.handleCreateProduct = this.handleCreateProduct.bind(this);

    this.fetchCityDataDebounced = lodash.debounce(this.fetchCityData, 300);
  }

  resetFields(){
    this.setState({
      labelError: "",
      categoryError: "",
      cityError: "",
      priceError:"",
      //-----

      //product data----
      label: "",
      selectedCategory: null, //categoryID
      selectedCity: null, // cityID
      description: "",
      price: 0
    });
  }

  show(){
    this.resetFields();
    this.setState({show:true});
  }

  hide(){
    this.setState({show:false});
  }

  componentDidMount(){
    this.fetchCategoryData();
  }

  checkInputs(){
    let error = false;
    if (this.state.label.length === 0) {
      error = true;
      this.setState({labelError:"Label cannot be empty.",});
    }else this.setState({labelError:""});
    if (!this.state.selectedCategory){
      error = true;
      this.setState({categoryError:"Select a category."});
    }else this.setState({categoryError:""});
    if (this.state.price < 0){
      error = true;
      this.setState({priceError:"Price cannot be less than 0."});
    }else this.setState({priceError:""});
    if (!this.state.selectedCity){
      error = true;
      this.setState({cityError:"Select a city."});
    }else this.setState({cityError:""});
    return error;
  }

  handleCreateProduct(){
    let inputError = this.checkInputs();
    if (!inputError){
      const params = {
        price: this.state.price,
        label: this.state.label,
        description: this.state.description,
        refCityId: this.state.selectedCity
      };

      api.post("/usermain/me/owns?access_token="+localStorage.accessToken, params)
      .then((response) =>{
        console.log(response);
        if (response.status === 200){
          console.log("data",response.data);
          let productID = response.data.id;
          let categoryID = this.state.selectedCategory;
          const data =  {"refProductId": productID, "refProductCategoryId": categoryID };
          api.post("/Product_ProductCategories?access_token="+localStorage.accessToken, data)
          .then((response)=>{
            if(response.status === 200){
              this.hide();
            }
          })
          .catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
          });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Error: ", error.response);
      });
    }
  }

  fetchCityData(searchTerm, callback){
    if (searchTerm.length === 0){callback(null,null);return;}
    api.get('/cities?access_token='+localStorage.accessToken, {params: this.paramsForSearchTerm(searchTerm)})
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

  paramsForSearchTerm(searchTerm){
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

  fetchCategoryData(){
    var categories = null;
    api.get('/ProductCategories?access_token='+localStorage.accessToken)
    .then((response) => {
      if (response.status === 200){
        categories = response.data;
        const transformedCategories = categories.map((category)=>{
          return {value:category.id, label:category.name};
        });
        this.setState({formHelperData:{...this.state.formHelperData,categories:transformedCategories}});
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      console.log("Error: ", error.response);
    });
  }


  render(){
    return(
      <Modal
          show={this.state.show}
          bsSize="large"
          container={this.props.modalContainer}
          onHide={() => {this.hide()}}>

          <Modal.Header>
            <Modal.Title id="modal-title">Create product</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form>
              <FormGroup controlId="formLabel" validationState={(this.state.labelError === "") ? null:"error"}>
                <ControlLabel>Label<span style={{fontSize:"150%", color:"red"}}>*</span></ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.label}
                  placeholder="Enter label"
                  onChange={(e) => {this.setState({label:e.target.value})}}
                  autoComplete="off"
                />
                <HelpBlock>{this.state.labelError}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="formCategory" validationState={(this.state.categoryError === "") ? null:"error"}>
                <ControlLabel>Category<span style={{fontSize:"150%", color:"red"}}>*</span></ControlLabel>

                <Select
                  name="selectFieldCategory"
                  value= {this.state.selectedCategory}
                  onChange= {(selected)=>{this.setState({selectedCategory:selected.value})}}
                  multi={false}
                  options={this.state.formHelperData.categories}
                 />
                <HelpBlock>{this.state.categoryError}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="formCity" validationState={(this.state.cityError === "") ? null:"error"}>
                <ControlLabel>City<span style={{fontSize:"150%", color:"red"}}>*</span></ControlLabel>

                <Select.Async
                  name="selectFieldCity"
                  value= {this.state.selectedCity}
                  onChange= {(selected)=>{this.setState({selectedCity:selected.value})}}
                  multi={false}
                  options={this.state.formHelperData.categories}
                  loadOptions={(input, callback)=>{this.fetchCityDataDebounced(input,callback)}}
                 />

                <HelpBlock>{this.state.cityError}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="formPrice" validationState={(this.state.priceError === "") ? null:"error"}>
              <ControlLabel>Price</ControlLabel>
                <InputGroup>
                  <FormControl
                  type="number"
                  min="0"
                  value={this.state.price}
                  onChange={(e) => {this.setState({price:e.target.value}); }}
                  style={{zIndex:0}}
                  />
                  <InputGroup.Addon>$</InputGroup.Addon>
                </InputGroup>
                <HelpBlock>{this.state.priceError}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="formDescription">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  style={{resize:"vertical"}}
                  value={this.state.description}
                  placeholder="Enter description"
                  onChange={(e) => {this.setState({description:e.target.value})}}
                  autoComplete="off"
                />
              </FormGroup>
            </form>

          </Modal.Body>
          <Modal.Footer  >
            <Button onClick={() => {this.hide()}} bsSize="small">Cancel</Button>
            <Button onClick={this.handleCreateProduct}  bsStyle="primary" bsSize="small">Create</Button>
          </Modal.Footer>
        </Modal>

    );
  }
}

class CustomToggle extends React.Component {
  render() {
    return (
      <div hidden="true"/>
    );
  }
}
