import React, {Component} from 'react';
import { Button, Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, InputGroup,ListGroup,ListGroupItem, Dropdown, MenuItem, Col,HelpBlock } from 'react-bootstrap';
import api from '../../../api';


export class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            product:[]
        }
    }



    show(){
        this.setState({show:true});
    }

    hide(){
        this.setState({show:false});
    }

    render() {
        return(
            <Modal
                show={this.state.show}
                bsSize="large"
                container={this.props.modalContainer}
                onHide={this.hide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">Product detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="productLabel">
                            <Col componentClass={ControlLabel} sm={2}>
                                Product label:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="productCity">
                            <Col componentClass={ControlLabel} sm={2}>
                                City:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="productPrice">
                            <Col componentClass={ControlLabel} sm={2}>
                                Price:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="productDescription">
                            <Col componentClass={ControlLabel} sm={2}>
                                Description:
                            </Col>
                            <Col sm={10}>
                                <FormControl componentClass="textArea" disabled/>
                            </Col>

                        </FormGroup>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.hide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}