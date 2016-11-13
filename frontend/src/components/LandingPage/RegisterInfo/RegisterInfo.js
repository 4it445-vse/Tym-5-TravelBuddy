import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Grid,Row,Col,Panel, Button,Glyphicon} from 'react-bootstrap';

export class RegisterInfo extends Component {

    render() {

        const title = 'Join Travel Buddy';
        const para_1 = 'Are you a traveller who would like to get help with guiding at some destination or just to hang out with locals?';
        const para_2 = 'Or are you a local who would like to offer some services for travellers or just to meet new people?';
        const para_3 = 'Then join Travel Buddy!';

        return (
            <Grid bsClass="container contentContainer">
                <Row bsClass="marginTop" className="show-grid">
                    <Col md={12} lg={12}>
                        <Panel header={title} bsClass="panel" bsStyle="primary">
                            <div id="at-register">
                                <ul>
                                    <li>{para_1}</li>
                                    <li>{para_2}</li>
                                    <li>{para_3}</li>
                                </ul>
                                
                                <LinkContainer to="/registration">
                                    <Button bsSize="large" block><Glyphicon glyph="user" /> Register</Button>
                                </LinkContainer>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
