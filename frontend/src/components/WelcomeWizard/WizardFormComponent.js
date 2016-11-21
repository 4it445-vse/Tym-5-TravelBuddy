import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Image } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { ProfilePictureEditorComponent } from "../ProfilePictureEditor/ProfilePictureEditorComponent.js";
import api from '../../api.js';

export default class WizardFormComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pictureBLOB: null, // so far this is always null!
      pictureURL: null,
      country: "",
      motto: "",
      aboutMe: "",

      countries: []
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
  }

  loadCountryEntries(){
    var countries = null;
    api.get('/Countries')
    .then((response) => {
      //console.log(response.data);
      //console.log(response.status);
      if (response.status === 200){
        countries = response.data;
        this.setState({countries:countries});
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
    event.target.value = '';
    reader.onloadend = () => {
      this.refs.pictureEditor.show();
      this.refs.pictureEditor.setPicture(reader.result);
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
            <input type={type} ref="fileInput" style={{display: "none"}} onChange={(e)=>this.handlePictureChange(e)} accept="image/*"/>
            <Button type="submit" onClick={(e) => {e.preventDefault(); ReactDOM.findDOMNode(this.refs.fileInput).click();}}>
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
            <FormControl
              type={type}
              name={key}
              componentClass={type}
              value={this.state[key]}
              onChange={this.handleInputChange}
            />
          );
        case "select":
          return(
            <FormControl componentClass="select" placeholder="Select your country" value={this.state.country} onChange={this.handleCountryChange}>
              <option value=""></option>
              {this.state.countries.map((element) => {
                  return (
                    <option value={element.id} key={element.id}>{element.name}</option>
                  );
              })}
            </FormControl>
          );

      default:
        return {};
    }
  }

  getFormData(){
    return{
      pictureURL: this.state.pictureURL,
      country: this.state.country, //id in table Countries
      motto: this.state.motto,
      aboutMe: this.state.aboutMe
    }
  }

  handleSubmit() {
    console.log('--- wizard form data', this.getFormData());
  }

  render() {
    const fields = [
      /*key, label, type, desc, */
      ['photo', 'Profile picture', 'file', null],
      ['country', 'Country', 'select', null],
      ['motto', 'Life motto', 'textarea', null],
      ['aboutMe', 'About Me', 'textarea', null]
    ];

      return(
        <div style={{margin:"auto"}} >
          <ProfilePictureEditorComponent container={this.props.modal} ref="pictureEditor" setPicture={this.setPicture}/>
          <div style={{background:"#2fa4e7", color:"white", width:"100%", padding: "10px"}}>
          Please fill in the following details that will be handy for other users considering you are a traveller or a buddy (however, you can skip this step and complete it later on your profile page, where you will also be able to upload some pictures).
          </div>
          <div>
            <form  onSubmit={this.handleSubmit} style={{padding: "10px"}}>
                {fields.map(([key, label, type]) => {
                    return (
                      <FormGroup key={key} controlId={key}>
                        <ControlLabel>{label}</ControlLabel>
                        {this.createField(type, key)}
                      </FormGroup>
                    );
                })}
            </form>
          </div>
        </div>
      );
  }
}
