import React, { Component } from 'react';
import { Alert, ButtonGroup, Button, Glyphicon, Modal} from 'react-bootstrap';
import { SlideIndicator } from '../common/SlideIndicator/SlideIndicator.js';

const overlayStyle = {
  background: "rgba(0,0,0,0.6)"
}

export class WelcomeWizardModal extends Component {
  constructor(props) {
    super(props);
    const { show } = this.props;
    this.state = {
      "show": show,
      "currentStep": 1,
      "lastStep": 3
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

  handleSubmit() {
    this.setState({show: false});
  }

  render() {
    return (
      <Modal bsSize="large" show={this.state.show} aria-labelledby="contained-modal-title-lg" style={overlayStyle} onHide={this.handleSubmit}>
        <Modal.Header>
          <Modal.Title>Welcome Tutorial</Modal.Title>
          <Modal.Body>
            <p>sem prijde komponenta od Dana</p>
            <h1>{this.state.currentStep} {this.state.show}</h1>
          </Modal.Body>
          <Modal.Footer>
            {this.state.currentStep !== 1 ? <Button onClick={this.moveLeft}><Glyphicon glyph="glyphicon glyphicon-chevron-left"></Glyphicon></Button> : undefined}
            {this.state.currentStep !== this.state.lastStep ?
              <Button onClick={this.moveRight}><Glyphicon glyph="glyphicon glyphicon-chevron-right"></Glyphicon></Button>
              :
              <Button bsStyle="primary" onClick={this.handleSubmit}>Done</Button>
            }
            {/* <SlideIndicator/> */}

          </Modal.Footer>
        </Modal.Header>
      </Modal>
    );
  }
}
