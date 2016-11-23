import React, { Component } from 'react';
import { Button, Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, InputGroup,ListGroup,ListGroupItem, Dropdown, MenuItem, Col,HelpBlock } from 'react-bootstrap';
import api from '../../api.js';
import lodash from "lodash";
import ReactDOM from 'react-dom';


export class CreateProductComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      show: true,
      dropdownMenu: null,

      formHelperData: {
        categories: [],
        cities: []
      },

      showDropdown: false,

      //product data----
      label: "",
      category: "",
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
    const params = {
      price: this.state.price,
      label: this.state.label,
      description: this.state.description,
      refOwnedUserId: localStorage.getItem('userId'),
      refCityId: this.state.city.id
    };

    api.post("/products?access_token="+localStorage.accessToken, params)
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
      this.setState({formHelperData:{...this.state.formHelperData,cities: []}, showDropdown:false});
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
              <FormGroup controlId="formLabel">
                <ControlLabel>Label</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.label}
                  placeholder="Enter label"
                  onChange={(e) => {this.setState({label:e.target.value})}}
                />
                <FormControl.Feedback>
                  <span style={{fontSize:"150%", color:"red"}}>*</span>
                </FormControl.Feedback>
                <HelpBlock ></HelpBlock>
              </FormGroup>

              <FormGroup controlId="formCategory">
                <ControlLabel>Category</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.category}
                  placeholder="Select category"
                  onChange={(e) => {this.setState({category:e.target.value})}}
                >
                  <option value="">Select category</option>

                  {this.state.formHelperData.categories.map((element) => {
                      return (
                        <option value={element.id} key={element.id}>{element.name}</option>
                      );
                  })}

                </FormControl>
              </FormGroup>


              <FormGroup controlId="formCity">
                <ControlLabel>City</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.city.name}
                  placeholder="Enter city"
                  onChange={this.handleCityChange}
                  autoComplete="off"
                  onKeyDown={this.handleKeyDownInCity}
                />

                <Dropdown id="cityDropdown" open={this.state.showDropdown} onToggle={(isOpen) =>{}} style={{width:"100%"}} onSelect={(eventKey, event)=>{this.setState({city:{id:eventKey.id,name:eventKey.name},showDropdown:false})}}>
                  <CustomToggle bsRole="toggle"/>
                  <Dropdown.Menu ref={(menu) => { this.dropdownMenu=menu;}} style={{top: "-10px", width:"100%"}} role="menu">
                    {this.state.formHelperData.cities.map((element) => {
                        return (
                          <MenuItem key={element.id} eventKey={{id:element.id, name:element.name}} >{element.name}</MenuItem>
                        );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
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
