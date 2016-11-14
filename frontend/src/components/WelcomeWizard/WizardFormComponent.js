import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Image } from 'react-bootstrap';
import ReactDOM from 'react-dom';

export default class WizardFormComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      picture: null,
      imagePreviewUrl: null,
      homeLocation: "",
      motto: "",
      aboutMe: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);

  }

  handlePictureChange(event){
    event.preventDefault();
    //console.log("xxx", event);

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      //console.log("ee", reader.result);
      this.setState({
        picture: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
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
            <Image height="100px" width="100px" src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : "/images/profilePictureDefault.png"}  thumbnail/>
          </div>
          <div style={{display:"inline-block", margin:"10px"}}>
            <input type={type} ref="fileInput" style={{display: "none"}} onChange={(e)=>this.handlePictureChange(e)}/>
            <Button type="submit" onClick={(e) => {e.preventDefault(); ReactDOM.findDOMNode(this.refs.fileInput).click();}}>
              Choose file
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

      default:
        return {};
    }
  }

  getFormData(){
    return{
      picture: this.state.picture,
      homeLocation: this.state.homeLocation,
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
      ['homeLocation', 'Home location', 'text', null],
      ['motto', 'Life motto', 'textarea', null],
      ['aboutMe', 'About Me', 'textarea', null]
    ];

      return(
        <div style={{margin:"auto"}}>
        <div style={{background:"#2fa4e7", color:"white", width:"100%", padding: "10px"}}>
        Please fill in the following details that will be handy for other users considering you are a traveller or a buddy (however, you can skip this step and complete it later on your profile page, where you will also be able to upload some pictures):

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