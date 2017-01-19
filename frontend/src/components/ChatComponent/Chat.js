import React, { Component } from 'react';
import { Col, Row } from "react-bootstrap";
import { MessagesList } from "./MessagesList.js";
import { ConnectionsList } from "./ConnectionsList.js";
import io from 'socket.io-client';

export class Chat extends Component{
  constructor(props){
    super(props);
    this.state = {
    }

    const socket = io('', { path: '/api/chat' });
    socket.on("connect",()=>{
      socket.emit("hello",{userId:localStorage.userId});
    });

    socket.on('new message notification',(msg)=>{
      console.log("i got a message notification",msg);
      this.connList.pushConnectionToTop(msg.refConnectionId, true);
    });

    this.socket = socket;

    this.connectionSelectedCallback = this.connectionSelectedCallback.bind(this);
    this.messageSentCallback = this.messageSentCallback.bind(this);
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
            <ConnectionsList ref={(connList)=>{this.connList = connList;}} connectionSelectedCB={this.connectionSelectedCallback}/>
            </Col>
            <Col md={8} style={{padding:"0",background:"white"}}>
              <MessagesList ref={(msgList)=>{this.messageList = msgList;}} messageSentCB={this.messageSentCallback} socket={this.socket}/>
            </Col>
          </div>

        </Row>
    );
  }
}
