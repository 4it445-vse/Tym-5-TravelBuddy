import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';

export class WizardPageComponent extends Component {

  render() {

      return(
        <div>
          <Modal.Header>
            <h2>
              Thank you for joining Travel Buddy!
            </h2>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body-container">
              <p>
              Within Travel Buddy platform you can both search and request for services offered by buddies around the world and even become a buddy by offering your own service!
              </p>
            </div>
          </Modal.Body>
        </div>
      );
  }
}
