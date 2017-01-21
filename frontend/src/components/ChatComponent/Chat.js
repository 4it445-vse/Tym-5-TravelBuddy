import React, { Component } from 'react';
import { Col, Row } from "react-bootstrap";
import { MessagesList } from "./MessagesList.js";
import { ConnectionsList } from "./ConnectionsList.js";
import io from 'socket.io-client';

const SPACING = 280;

export class Chat extends Component{
  constructor(props){
    super(props);
    this.state = {
      dynamicHeight: (window.innerHeight-SPACING)
    }


    this.connectionSelectedCallback = this.connectionSelectedCallback.bind(this);
    this.messageSentCallback = this.messageSentCallback.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions(){
    console.log("window",window.innerHeight);
    this.setState({dynamicHeight:(window.innerHeight-SPACING)});
  }

  componentWillMount(){
    const socket = io('', { path: '/api/chat' });
    socket.on("connect",()=>{
      socket.emit("hello",{userId:localStorage.userId});
    });

    socket.on('new message notification',(msg)=>{
      console.log("i got a message notification",msg);
      this.connList.pushConnectionToTop(msg.refConnectionId, true);
    });

    this.socket = socket;
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    this.socket.emit("forceDisconnect");
  }

  messageSentCallback(msg){
    this.connList.pushConnectionToTop(msg.refConnectionId, false);
  }

  connectionSelectedCallback(data){
    this.messageList.loadConnection(data);
  }

  render(){
    return(
      <Row
          className="modal-chat"
          style={{background:"white",margin:"0px",marginBottom:"15px"}}
          >
          <div style={{padding:"0"}}>
            <Col md={4} style={{padding:"0",background:"white"}}>
            <ConnectionsList height={this.state.dynamicHeight} ref={(connList)=>{this.connList = connList;}} connectionSelectedCB={this.connectionSelectedCallback}/>
            </Col>
            <Col md={8} style={{padding:"0",background:"white"}}>
              <MessagesList height={this.state.dynamicHeight} ref={(msgList)=>{this.messageList = msgList;}} messageSentCB={this.messageSentCallback} socket={this.socket}/>
            </Col>
          </div>

        </Row>
    );
  }
}
