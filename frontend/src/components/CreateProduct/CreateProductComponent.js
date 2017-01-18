import React, { Component } from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { ImageUploader } from '../common/ImageUploader/ImageUploader.js';
import api from '../../api.js';
import lodash from "lodash";
import { SubmitButton } from '../common/SubmitButton.js';

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
      isLoading: false,
      //-----

      //product data----
      label: "",
      selectedCategory: null, //categoryID
      selectedCity: null, // cityID
      description: "",
      price: "",
      picture: undefined
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
      price: undefined,
      picture: undefined
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
    if (isNaN(this.state.price) && this.state.price){
      error = true;
      this.setState({priceError:"Price must be a number."});
    }else this.setState({priceError:""});
    if (!this.state.selectedCity){
      error = true;
      this.setState({cityError:"Select a city."});
    }else this.setState({cityError:""});
    if (error) {
      this.setState({isLoading: false});
    }
    return error;
  }

  handleCreateProduct(){
    this.setState({isLoading: true});
    let inputError = this.checkInputs();
    if (!inputError){
      const params = {
        price: this.state.price,
        label: this.state.label,
        description: this.state.description,
        refCityId: this.state.selectedCity,
        picture: this._imgUp.getImage()
      };
      // console.log('---create prod params', params);
      api.post("/usermain/me/owns?access_token="+localStorage.accessToken, params)
      .then((response) =>{
        // console.log(response);
        if (response.status === 200){
          let productID = response.data.id;
          let categoryID = this.state.selectedCategory;
          const data =  {"refProductId": productID, "refProductCategoryId": categoryID };

          this.uploadProfilePicture(params.picture, productID);

          api.post("/Product_ProductCategories?access_token="+localStorage.accessToken, data)
          .then((response)=>{
            if(response.status === 200){
              this.setState({isLoading: false});
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

  uploadProfilePicture(image, productId){
    if(image && productId){

      var blob = this.dataURLtoBlob(image);
      var formData = new FormData();
      var fileName = "profilePicture.jpg";
      formData.append("imageFile", blob, fileName);

       api.post('/containers/productPictures/upload?access_token=' + localStorage.accessToken + '&productId=' + productId, formData)
         .then((data)=>{
           console.log('--- upload successful', data);
         })
         .catch((error) => {
           console.log('<!> upload Failed', error);
         });
    }
  }

  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
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
    let cssClass = "form-themed";
    return(
      <Modal
          show={this.state.show}
          container={this.props.modalContainer}
          // onHide={() => {this.hide()}}
          className="modal-create-product"
          >
          <Modal.Header>
            <Modal.Title id="modal-title">Create Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form className="form-create-product">
              <FormGroup className={cssClass} controlId="formLabel" validationState={(this.state.labelError === "") ? null:"error"}>
                <ControlLabel>Name<span style={{fontSize:"150%", color:"red"}}>*</span></ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.label}
                  placeholder="Enter name"
                  onChange={(e) => {this.setState({label:e.target.value})}}
                  autoComplete="off"
                />
                <HelpBlock>{this.state.labelError}</HelpBlock>
              </FormGroup>

              <FormGroup className={cssClass} controlId="formCategory" validationState={(this.state.categoryError === "") ? null:"error"}>
                <ControlLabel>Category<span style={{fontSize:"150%", color:"red"}}>*</span></ControlLabel>
                <Select
                  name="selectFieldCategory"
                  placeholder="Select category"
                  value={this.state.selectedCategory}
                  onChange={(selected)=>{this.setState({selectedCategory:selected.value})}}
                  multi={false}
                  options={this.state.formHelperData.categories}
                 />
                <HelpBlock>{this.state.categoryError}</HelpBlock>
              </FormGroup>

              <FormGroup className={cssClass} controlId="formCity" validationState={(this.state.cityError === "") ? null:"error"}>
                <ControlLabel>City<span style={{fontSize:"150%", color:"red"}}>*</span></ControlLabel>

                <Select.Async
                  name="selectFieldCity"
                  placeholder="Select city"
                  value={this.state.selectedCity}
                  onChange={(selected)=>{this.setState({selectedCity:selected.value})}}
                  multi={false}
                  options={this.state.formHelperData.categories}
                  loadOptions={(input, callback)=>{this.fetchCityDataDebounced(input,callback)}}
                 />

                <HelpBlock>{this.state.cityError}</HelpBlock>
              </FormGroup>

              <FormGroup className={cssClass} controlId="formPrice" validationState={(this.state.priceError === "") ? null:"error"}>
                  <ControlLabel>Price(<i className="fa fa-eur"></i>)</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter price or leave blank"
                    value={this.state.price}
                    onChange={(e) => {this.setState({price:e.target.value}); }}
                    style={{zIndex:0}}
                  />
                <HelpBlock>{this.state.priceError}</HelpBlock>
              </FormGroup>

              <FormGroup className={cssClass} controlId="formDescription">
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

              <FormGroup className={cssClass} controlId="formPicture">
                <ControlLabel>Picture</ControlLabel>
                <ImageUploader ref={(imgUp) => { this._imgUp = imgUp; }}/>
              </FormGroup>

            </form>

          </Modal.Body>
          <Modal.Footer  >
            <Button onClick={() => {this.hide()}} bsSize="small">Cancel</Button>
            <span onClick={this.handleCreateProduct}>
              <SubmitButton type="button" isLoading={this.state.isLoading} bsStyle="primary" bsSize="small" name="Create"/>
            </span>
          </Modal.Footer>
        </Modal>

    );
  }
}

// Unused for now @Martin @Dan
//
// class CustomToggle extends React.Component {
//   render() {
//     return (
//       <div hidden="true"/>
//     );
//   }
// }
