import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';


export class BuddyProfile extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
           <div>
               <h1 className="text-center">Buddy Detail</h1>
               <Grid>
                   <Row className="show-grid">
                       <Col xs={4} md={4} lg={4}>Name</Col>
                       <Col xs={8} md={8} lg={8}>{this.props.user}</Col>
                   </Row>

               </Grid>
           </div>
        );
    }

}

