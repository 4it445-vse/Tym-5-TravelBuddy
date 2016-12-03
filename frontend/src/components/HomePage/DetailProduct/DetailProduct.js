import React, {Component} from 'DetailProduct';
import { Button, Glyphicon, Modal, Form, FormGroup, ControlLabel, FormControl, InputGroup,ListGroup,ListGroupItem, Dropdown, MenuItem, Col,HelpBlock } from 'react-bootstrap';
import api from '../../../api';


export class DetailProduct extends Component {
    constructor(props) {
        super(props);


        this.state = {
            show: false,
            product: null}
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
                bsSize="small"
                container={this.props.modalContainer}
            >
                <Modal.Header>
                    <Modal.Title id="modal-title">Create product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="filterName">
                            <Col componentClass={ControlLabel} sm={2}>
                                City:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="filterCity">
                            <Col componentClass={ControlLabel} sm={2}>
                                Product label:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="filterPrice">
                            <Col componentClass={ControlLabel} sm={2}>
                                Price:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" disabled/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit">
                                    Filter
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>

                </Modal.Body>

            </Modal>
        );
    }
}