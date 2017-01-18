import React, { Component } from 'react';
import { Col, Row } from "react-bootstrap";

export class MessageItem extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  createMessageColumn(){
    if (this.props.message.fromUserId.toString() === this.props.currentUser){
      return(
        <Col xs={8} className="pull-right" style={{textAlign:"right"}}>
          <div style={{backgroundColor:"#F05F40",color:"white",display:"inline-block",borderRadius:"8px",borderBottomRightRadius:"0px",padding:"5px",wordBreak:"break-all"}}>{this.props.message.text}</div>
        </Col>
      );
    }else {
      return(
        <Col xs={8}>
          <div style={{backgroundColor:"#E5E5E5",display:"inline-block",borderRadius:"8px",borderBottomLeftRadius:"0px",padding:"5px",wordBreak:"break-all"}}>{this.props.message.text}</div>
        </Col>
      );
    }
  }

  render(){
    return(
      <Row className="infinite-list-item" style={{padding:"10px 10px", margin:"0px"}}>
        {this.createMessageColumn()}
      </Row>
    );
  }
}
