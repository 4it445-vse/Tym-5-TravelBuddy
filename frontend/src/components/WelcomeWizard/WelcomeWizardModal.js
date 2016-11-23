import React, { Component } from 'react';
import { Button, Glyphicon, Modal} from 'react-bootstrap';
// import { SlideIndicator } from '../common/SlideIndicator/SlideIndicator.js';
import WizardFormComponent from './WizardFormComponent.js';
import { WizardPageComponent } from './WizardPageComponent.js';
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
      modal: null
    }

    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
    // console.log('--- localStorage', localStorage);

    var data = this._form.getFormData();
    const userId = localStorage.userId;

    console.log('--- profilePicture', data.profilePicture);
    // api.post('/containers/profilePictures/upload', {file: data.profilePicture})
    //   .then(({data})=>{
    //     console.log('--- upload successful', data);
    //   })
    //   .catch((error) => {
    //     console.log('<!> upload Failed', error);
    //   });
    this.saveUserDetail(userId, data);
    this.setFalseIsFirstLogin(userId);

  }

  saveUserDetail(userId, data) {
    const srvUrl = '/UserMain/' + userId + '/userDetail?access_token=' + localStorage.accessToken;
    api.post(srvUrl, data)
      .then(({data})=> {
        this.setState({show: false});
      })
      .catch((error)=> {
        console.log('<!> saveUserDetail', error);
        this.setState({show: false});
      });
  }

  setFalseIsFirstLogin(userId) {
    const srvUrl = '/UserMain/' + userId + '?access_token=' + localStorage.accessToken;
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
      <Modal bsSize="large" show={this.state.show} aria-labelledby="contained-modal-title-lg" style={overlayStyle} onHide={this.handleSubmit} backdrop="static">
        <Modal.Header ref="modal" className="modal-container">
          {/* <Modal.Title>Welcome Tutorial</Modal.Title> */}
          <Modal.Body >
          {/* <WizardFormComponent ref={(form) => { this._form = form; }}/> */}
            {this.state.currentStep === 1 ? <WizardPageComponent/> : undefined}
            {this.state.currentStep === this.state.lastStep ? <WizardFormComponent ref={(form) => { this._form = form; }} modal={this.state.modal}/> : undefined}
          </Modal.Body>
          <Modal.Footer>
            {this.state.currentStep !== 1 ? <Button onClick={this.moveLeft}><Glyphicon glyph="glyphicon glyphicon-chevron-left"></Glyphicon></Button> : undefined}
            {this.state.currentStep !== this.state.lastStep ?
              <Button onClick={this.moveRight}><Glyphicon glyph="glyphicon glyphicon-chevron-right"></Glyphicon></Button>
              :
              <Button type="submit" bsStyle="primary" onClick={this.handleSubmit}>Done</Button>
            }
            {/* <SlideIndicator/> */}

          </Modal.Footer>
        </Modal.Header>
      </Modal>
    );
  }
}
