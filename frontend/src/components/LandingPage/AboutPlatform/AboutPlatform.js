import React, {Component} from 'react';
import { Panel, Grid, Row, Col} from 'react-bootstrap';

export class AboutPlatform extends Component {


    render() {
        const icon_1 = <i className="fa fa-plane fa-4x" aria-hidden="true"></i>;
        const icon_2 = <i className="fa fa-globe fa-4x" aria-hidden="true"></i>;
        const icon_3 = <i className="fa fa-suitcase fa-4x" aria-hidden="true"></i>;
        const panel_title_1 = 'What is Travel Buddy?';
        const panel_title_2 = 'How does it work?';
        const panel_title_3 = 'How much does it cost?';
        const panel_text_1 = 'Travel Buddy™ is a web platform for connecting travellers and locals.';
        const panel_text_2 = 'Every registered user can both offer services for travellers and search & request for such services.';
        const panel_text_3 = 'Registration is free of charge. Regarding the services, it fully depends on the users offering them. Some of the services are for free, some of them for a charge.';

        return (

                <Grid bsClass="container contentContainer">
                    <div className="row center" id="at-platform">
                        <div className="h1 center title"><cite>Experiencing world with locals.</cite></div>

                    </div>
                    <Row bsClass="marginTop" className="show-grid">

                        <Col md={4} lg={4}>
                                <Panel header={panel_title_1} bsClass="panel" bsStyle="primary">
                                    <div className="info-height">
                                    {icon_1}    {panel_text_1}
                                    </div>
                                </Panel>

                        </Col>
                        <Col md={4} lg={4}>

                                <Panel header={panel_title_2}  bsClass="panel"  bsStyle="primary">
                                    <div className="info-height">
                                    {icon_2}    {panel_text_2}
                                        </div>
                                </Panel>

                        </Col>
                        <Col md={4} lg={4}>

                                <Panel header={panel_title_3}  bsClass="panel"  bsStyle="primary">
                                    <div className="info-height">
                                    {icon_3}    {panel_text_3}
                                    </div>
                                </Panel>

                        </Col>
                    </Row>
                </Grid>


        );
    }
}
