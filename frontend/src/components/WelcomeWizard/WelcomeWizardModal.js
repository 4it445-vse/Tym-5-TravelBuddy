import React, { Component } from 'react';
import { Button, Glyphicon, Modal} from 'react-bootstrap';
// import { SlideIndicator } from '../common/SlideIndicator/SlideIndicator.js';
import WizardFormComponent from './WizardFormComponent.js';
import { WizardPageComponent } from './WizardPageComponent.js';
import { SubmitButton } from '../common/SubmitButton.js';
import ReactDOM from 'react-dom';

import api from '../../api.js';

const overlayStyle = {
  background: "rgba(0,0,0,0.6)"
}

export class WelcomeWizardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "show": true,
      "currentStep": 1,
      "lastStep": this.props.steps,
      modal: null,
      isLoading: false
    }

    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.uploadProfilePicture = this.uploadProfilePicture.bind(this);
  }

  moveLeft() {
    if (this.state.currentStep !== 1) {
      this.setState({currentStep: this.state.currentStep - 1});
    }
  }

  moveRight() {
    if (this.state.currentStep !== this.state.lastStep) {
      this.setState({currentStep: this.state.currentStep + 1});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('--- wizard form', this._form.getFormData());
    // console.log('--- formData', event.target);
    var data = this._form.getFormData();

    this.saveUserDetail(data);
    this.saveLanguages(data);
    this.setFalseIsFirstLogin();
  }

  saveLanguages(data){
    this.setState({isLoading: true});
    if (data.languages){
      //console.log("lang",data.languages);
      const transformedLanguages = data.languages.map((language)=>{
        return {
          //"refUserId": "3",
          "refLanguageId": language.value
        }
      });
      //console.log(transformedLanguages);
      //Workaround here, for loop of request calls to API, better would be to use bulk create
      // but at this time API doesnt accept array of objects!
      transformedLanguages.forEach((item,index)=>{
        api.post('/UserLanguages?access_token=' + localStorage.accessToken,item)
          .then((data)=>{
            this.setState({isLoading: false});
            console.log('--- upload successful', data);
          })
          .catch((error) => {
            console.log('<!> upload Failed', error);
          });

      });
    }
  }

  uploadProfilePicture(data){
    this.setState({isLoading: true});
    if(data.pictureURL){

      var blob = this.dataURLtoBlob(data.pictureURL);
      var formData = new FormData();
      var fileName = "profilePicture.jpg";
      formData.append("imageFile",blob, fileName);

      console.log('--- profilePicture');
       api.post('/containers/profilePictures/upload?access_token=' + localStorage.accessToken, formData)
         .then((data)=>{
           this.setState({isLoading: false});
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

  saveUserDetail(data) {
    this.setState({isLoading: true});
    var dataToSend = {
      bio:data.bio,
      motto:data.motto,
      refCountryId: data.country
    }

    const srvUrl = '/UserMain/me/userDetail?access_token=' + localStorage.accessToken;
    api.post(srvUrl, dataToSend)
      .then(({responseData})=> {
        this.uploadProfilePicture(data);
        this.setState({isLoading: false});
        this.setState({show: false});
      })
      .catch((error)=> {
        console.log('<!> saveUserDetail', error);
        this.setState({show: false});
      });
  }

  setFalseIsFirstLogin() {
    const srvUrl = '/UserMain/me?access_token=' + localStorage.accessToken;
    api.patch(srvUrl, {'isFirstLogin': false})
      .then(({data})=> {
        console.log('--- update isFirstLogin ok', data);
      })
      .catch((error)=> {
        console.log('<!> setFalseIsFirstLogin', error);
      });
  }

  componentDidMount() {
    // console.log('--- wiazrd form', this._form.getFormData());
    this.setState({modal: ReactDOM.findDOMNode(this.refs.modal)})
  }

  render() {
    return (
      <Modal
        className="modal-welcome-wizard"
        bsSize="large" show={this.state.show}
        aria-labelledby="contained-modal-title-lg"
        style={overlayStyle} onHide={this.handleSubmit}
        backdrop="static">
          {this.state.currentStep === 1 ? <WizardPageComponent/> : undefined}
          {this.state.currentStep === this.state.lastStep ? <WizardFormComponent ref={(form) => { this._form = form; }} modal={this.state.modal}/> : undefined}
          <Modal.Footer>
            {this.state.currentStep !== 1 ? <Button onClick={this.moveLeft}><Glyphicon glyph="glyphicon glyphicon-chevron-left"></Glyphicon></Button> : undefined}
            {this.state.currentStep !== this.state.lastStep ?
              <Button onClick={this.moveRight}>Continue&nbsp;<Glyphicon glyph="glyphicon glyphicon-chevron-right"></Glyphicon></Button>
              :
              <span onClick={this.handleSubmit}><SubmitButton name="Done" bsStyle="primary" isLoading={this.state.isLoading}/></span>
            }
          </Modal.Footer>
      </Modal>
    );
  }
}
