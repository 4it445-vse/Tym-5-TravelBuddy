import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';


export class BuddyProfile extends Component {
    constructor(props) {
        super(props);
        console.log("USER DETAIL : ",this.props.user);
    }

    render() {
        return(
           <div className="container">
               <h1 className="text-center">Buddy Detail</h1>
               <Grid bsClass="bg-info">
                   <Row className="show-grid">
                       <Col xs={4} md={4} lg={4}>Buddy:</Col>
                       <Col xs={8} md={8} lg={8}></Col>
                   </Row>
                   <Row className="show-grid">
                       <Col xs={4} md={4} lg={4}>Buddy:</Col>
                       <Col xs={8} md={8} lg={8}></Col>
                   </Row>
               </Grid>
           </div>
        );
    }

}

