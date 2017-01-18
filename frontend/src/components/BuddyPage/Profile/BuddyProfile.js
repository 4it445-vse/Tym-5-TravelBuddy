import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import api from '../../../api.js';

export class BuddyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            useritem: props.useritem
        };
        console.log("User PROPS",props.useritem);
    }

    render() {

        if(!this.state.useritem) {

        return(

                <div className="container">
                    <div className="h1"></div>
                    <br/>
                    <h1 className="text-center">Buddy Detail</h1>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={4} md={4} lg={4}>Name:</Col>
                            <Col xs={8} md={8} lg={8}>userDetailData</Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={4} md={4} lg={4}>Buddy:</Col>
                            <Col xs={8} md={8} lg={8}></Col>
                        </Row>
                    </Grid>
                    <div className="container">
                        <div className="h3">User Rating</div>
                        <div>Rating 1.6</div>
                    </div>
                </div>
        );}
        else {
           return (
              <div className="container">
                  <div className="h1 bg-danger text-center">No user has been found!</div>
              </div>
           ) ;
            }
    }

}

