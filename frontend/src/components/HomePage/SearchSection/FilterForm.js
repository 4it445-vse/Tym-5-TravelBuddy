import React, {Component} from 'react';
import {Form,ControlLabel, Col, Button, InputGroup, FormGroup, FormControl, Panel} from 'react-bootstrap'


export class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        alert('Filtered text');
    }


    render() {

        return (
            <Panel>
            <Form horizontal onSubmit={this.handleSubmit}>
                <ControlLabel>Filter:</ControlLabel>
                <FormGroup controlId="filterName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text" placeholder="Name..."/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="filterCity">
                    <Col componentClass={ControlLabel} sm={2}>
                       City:
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text" placeholder="City..."/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="filterPrice">
                    <Col componentClass={ControlLabel} sm={2}>
                        Price:
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <InputGroup.Addon>$</InputGroup.Addon>
                            <FormControl type="text" />
                            <InputGroup.Addon>between</InputGroup.Addon>
                            <FormControl type="text" />
                            <InputGroup.Addon>.00</InputGroup.Addon>
                        </InputGroup>
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
            </Panel>
        );
    }
}