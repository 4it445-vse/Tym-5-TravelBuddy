import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Image, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { ProfilePictureEditorComponent } from "../ProfilePictureEditor/ProfilePictureEditorComponent.js";
import api from '../../api.js';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class WizardFormComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pictureBLOB: null, // so far this is always null!
      pictureURL: null,
      motto: "",
      aboutMe: "",

      countries: [],
      selectedCountry: null,

      languages: [],
      selectedLanguages: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.setPicture = this.setPicture.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentDidMount(){
    this.setState({componentContainer: ReactDOM.findDOMNode(this.refs.componentContainer)});
    this.loadCountryEntries();
    this.loadLanguageEntries();
  }

  loadLanguageEntries(){
    var languages = null;
    api.get('/Languages?access_token=' + localStorage.accessToken)
    .then((response) => {
      //console.log(response.data);
      if (response.status === 200){
        languages = response.data;
        const transformedLanguages = languages.map((language)=>{
          return {value:language.id, label:language.name};
        });
        this.setState({languages:transformedLanguages});
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      console.log("Error: ", error.response);
    });
  }

  loadCountryEntries(){
    var countries = null;
    api.get('/Countries')
    .then((response) => {
      //console.log(response.data);
      if (response.status === 200){
        countries = response.data;
        const transformedCountries = countries.map((country)=>{
          return {value:country.id, label:country.name}
        });
        this.setState({countries:transformedCountries});
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      console.log("Error: ", error.response);
    });
  }

  handleCountryChange(event){
    this.setState({country: event.target.value});
  }

  handlePictureChange(event){
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.refs.pictureEditor.show();
      this.refs.pictureEditor.setPicture(reader.result);
      //console.log("loadend",reader.result);
    }
    reader.onabort = () =>{
      console.log("aborted-.");
    }
    reader.onerror = () =>{
      console.log("error");
    }
    reader.readAsDataURL(file);
  }

  setPicture(pictureBLOB,pictureURL){
    this.setState({pictureBLOB:pictureBLOB, pictureURL:pictureURL});
  }

  handleInputChange(event){
        this.setState({[event.target.name] : event.target.value});
  }


  createField(type, key) {
    switch (type) {
      case 'file':
      return (
        <div>
          <div style={{display:"inline-block"}}>
            <Image height="100px" width="100px" src={this.state.pictureURL ? this.state.pictureURL : "/images/profilePictureDefault.png"}  thumbnail/>
          </div>
          <div style={{display:"inline-block", margin:"10px"}}>
            <input type={type} ref="fileInput" style={{display: "none"}} onChange={(e)=>this.handlePictureChange(e)} accept="image/*" autoComplete="off"/>
            <Button type="submit" onClick={(e) => {e.preventDefault(); var input = ReactDOM.findDOMNode(this.refs.fileInput); input.click(); input.value = null;}}>
              Choose photo
            </Button>

          </div>
        </div>
      );
      case 'text':
      return (
        <FormControl
          type={type}
          name={key}
          value={this.state[key]}
          onChange={this.handleInputChange}
        />
      );
      case 'textarea':
          return (
            <div className="textarea-wrapper">
              <FormControl
                type={type}
                name={key}
                componentClass={type}
                value={this.state[key]}
                onChange={this.handleInputChange}
              />
            </div>
          );
        case "select":
          return(

            <Select
              name="selectFieldCountry"
              value={this.state.selectedCountry}
              onChange={(selected)=>{this.setState({selectedCountry:selected})}}
              multi={false}
              options={this.state.countries}
             />

          );
        case "tagInput":
          return(
              <Select
                name="selectFieldLanguages"
                value={this.state.selectedLanguages}
                onChange={(selected)=>{this.setState({selectedLanguages:selected});}}
                multi={true}
                options={this.state.languages}
               />

          );

      default:
        return {};
    }
  }

  getFormData(){
    return{
      pictureURL: this.state.pictureURL,
      country: this.state.selectedCountry ? this.state.selectedCountry.value : null, //id in table Countries
      motto: this.state.motto,
      bio: this.state.aboutMe,
      languages: this.state.selectedLanguages
    }
  }

  handleSubmit() {
    console.log('--- wizard form data', this.getFormData());
  }

  render() {
    let cssClass = "form-themed";
    const fields = [
      /*key, label, type, desc, */
      ['photo', 'Profile picture', 'file', null],
      ['country', 'Country', 'select', null],
      ["languages", "Languages", "tagInput", null],
      ['motto', 'Life motto', 'text', null],
      ['aboutMe', 'About Me', 'textarea', null]
    ];

      return(
        <div>
          <Modal.Header>
            <h2>Finish the registration!</h2>
          </Modal.Header>
          <Modal.Body>
            <ProfilePictureEditorComponent container={this.props.modal} ref="pictureEditor" setPicture={this.setPicture}/>
            <div>
              <form autoComplete="off" onSubmit={this.handleSubmit} className="bg-dark form-welcome-wizard modal-content">
                  <p>
                  Please fill in the following details that will be handy for other users considering you are a traveller or a buddy
                  </p>
                  {fields.map(([key, label, type]) => {
                      return (
                        <FormGroup key={key} controlId={key} className={cssClass}>
                          <ControlLabel>{label}</ControlLabel>
                          {this.createField(type, key)}
                        </FormGroup>
                      );
                  })}
              </form>
            </div>
          </Modal.Body>
        </div>
      );
  }
}
