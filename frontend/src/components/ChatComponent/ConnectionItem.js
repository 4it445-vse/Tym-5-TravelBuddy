import React, { Component } from 'react';
import { Col, Button, Badge } from "react-bootstrap";

export class ConnectionItem extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
    this.handleClickEvent=this.handleClickEvent.bind(this);
  }

  handleClickEvent(){
    this.props.handleElementClick(this.props.data, this.props.data.id);

  }

  render(){
    var userData = (this.props.data.user1.id.toString() !== this.props.currentUser) ? this.props.data.user1 : this.props.data.user2;
    var imgAddress = "/images/profilePictureDefault.png";
    if (userData.userDetail){
      if(userData.userDetail.profilePicture) imgAddress = "/api/containers/profilePictures/download/"+userData.userDetail.profilePicture+"?access_token="+localStorage.accessToken;
    }
    var textStyle = {fontWeight:"normal"};
    var buttonStyle = {height:"90px", width:"100%", margin:"0", borderBottom:"1px solid #e5e5e5", borderRadius:"0",display: "flex"};
    if (this.props.active){
      buttonStyle = {...buttonStyle, background:"#F89778", color:"white"};
       textStyle = {fontWeight:"bold"};
    }

    let notificaionMessage;
    if(!this.props.active){
      if (this.props.hasNotification){
        notificaionMessage = (
          <div>
            <Badge style={{background:"green"}}>New messages</Badge>
          </div>
        );
      }else if (this.props.data.notification) {
        if (this.props.data.notification.refUserId.toString() === this.props.currentUser){
          notificaionMessage = (
            <div>
              <Badge style={{background:"green"}}>New messages</Badge>
            </div>
          );
        }
      }
    }

    return(
      <Button  style={buttonStyle} onClick={this.handleClickEvent}>
          <Col xs={3} style={{padding:"0px"}}>
            <div style={{height:"65px",width:"65px"}}>
              <img height={60} width={60} src={imgAddress} className="img-circle" role="presentation"/>
              </div>
          </Col>

          <Col xs={9} style={{margin:"auto"}}>
            <div style={textStyle}>
              {userData.firstName} {userData.lastName}
            </div>
              { notificaionMessage }
          </Col>
      </Button>
    );
  }
}
