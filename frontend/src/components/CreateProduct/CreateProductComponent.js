import React, { Component } from 'react';
import { Button, Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, InputGroup,ListGroup,ListGroupItem, Dropdown, MenuItem, Col,HelpBlock } from 'react-bootstrap';
import api from '../../api.js';
import lodash from "lodash";
import ReactDOM from 'react-dom';


export class CreateProductComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      //form data---
      show: this.props.show,
      showDropdown: false,
      formHelperData: {
        categories: [],
        cities: []
      },

      labelError: "",
      categoryError: "",
      cityError: "",
      //-----



      //product data----
      label: "",
      category: -1,
      city: {
        id: null,
        name: "",
      },
      description: "",
      price: 0
      //-----
    }

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleKeyDownInCity = this.handleKeyDownInCity.bind(this);
    this.handleCreateProduct = this.handleCreateProduct.bind(this);

    this.fetchCitiesDebounced = lodash.debounce(this.fetchCityData, 300);
  }

  show(){
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
    if (this.state.category < 0){
      error = true;
      this.setState({categoryError:"Select a category."});
    }else this.setState({categoryError:""});
    if (!this.state.city.id){
      error = true;
      this.setState({cityError:"Invalid city."});
    }else this.setState({cityError:""});
    return error;
  }

  handleKeyDownInCity(event){
    if(event.which === 40){
      event.preventDefault();
      const node = ReactDOM.findDOMNode(this.dropdownMenu);
      if (node){
        node.firstChild.firstChild.focus();
      }
    }
  }

  handleCreateProduct(){
    let inputError = this.checkInputs();
    if (!inputError){
      const params = {
        price: this.state.price,
        label: this.state.label,
        description: this.state.description,
        refCityId: this.state.city.id
      };

      api.post("/usermain/me/owns?access_token="+localStorage.accessToken, params)
      .then((response) =>{
        console.log(response);
        if (response.status === 200){
          this.hide();
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Error: ", error.response);
      });
    }
  }

  fetchCityData(searchTerm){
    if (searchTerm.length > 0){
      api.get("/cities", {params: this.paramsForSearchTerm(searchTerm)})
      .then((response) =>{
        if (response.status === 200){
          this.setState({formHelperData:{...this.state.formHelperData,cities: response.data}, showDropdown:true});
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Error: ", error.response);
      });
    }else{
      this.setState({
        formHelperData:{...this.state.formHelperData,cities: []},
        showDropdown:false,
        city:{...this.state.city, id:null}
      });
    }
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
    api.get('/ProductCategories')
    .then((response) => {
      if (response.status === 200){
        categories = response.data;
        this.setState({formHelperData:{...this.state.formHelperData,categories:categories}});
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      console.log("Error: ", error.response);
    });
  }

  handleCityChange(event){
    let searchTerm = event.target.value;
    this.fetchCitiesDebounced(searchTerm);
    this.setState({city:{...this.state.city, name:event.target.value}});
  }

  render(){
    return(
      <Modal
          show={this.state.show}
          bsSize="large"
          container={this.props.modalContainer}
        >
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
                />
                <HelpBlock>{this.state.labelError}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="formCategory" validationState={(this.state.categoryError === "") ? null:"error"}>
                <ControlLabel>Category<span style={{fontSize:"150%", color:"red"}}>*</span></ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.category}
                  placeholder="Select category"
                  onChange={(e) => {this.setState({category:e.target.value})}}
                >
                  <option value={-1}>Select category</option>

                  {this.state.formHelperData.categories.map((element) => {
                      return (
                        <option value={element.id} key={element.id}>{element.name}</option>
                      );
                  })}

                </FormControl>
                <HelpBlock>{this.state.categoryError}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="formCity" validationState={(this.state.cityError === "") ? null:"error"}>
                <ControlLabel>City<span style={{fontSize:"150%", color:"red"}}>*</span></ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.city.name}
                  placeholder="Enter city"
                  onChange={this.handleCityChange}
                  autoComplete="off"
                  onKeyDown={this.handleKeyDownInCity}
                />
                <Dropdown id="cityDropdown" open={this.state.showDropdown} onToggle={(isOpen) =>{}} style={{width:"100%",display:"block"}} onSelect={(eventKey, event)=>{this.setState({city:{id:eventKey.id,name:eventKey.name},showDropdown:false})}}>
                  <CustomToggle bsRole="toggle"/>
                  <Dropdown.Menu ref={(menu) => { this.dropdownMenu=menu;}} style={{width:"100%"}} role="menu">
                    {this.state.formHelperData.cities.map((element) => {
                        return (
                          <MenuItem key={element.id} eventKey={{id:element.id, name:element.name}} >{element.name}</MenuItem>
                        );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <HelpBlock>{this.state.cityError}</HelpBlock>
              </FormGroup>

              <FormGroup controlId="formPrice">
              <ControlLabel>Price</ControlLabel>
                <InputGroup>
                  <FormControl
                  type="number"
                  value={this.state.price}
                  onChange={(e) => {this.setState({price:e.target.value}); }}
                  />
                  <InputGroup.Addon>$</InputGroup.Addon>
                </InputGroup>
              </FormGroup>

              <FormGroup controlId="formDescription">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  style={{resize:"vertical"}}
                  value={this.state.description}
                  placeholder="Enter description"
                  onChange={(e) => {this.setState({description:e.target.value})}}
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
