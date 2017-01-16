import React, { Component } from 'react';
import { Col, Modal, Row } from "react-bootstrap";
import { MessagesList } from "./MessagesList.js";
import { ConnectionsList } from "./ConnectionsList.js";
import io from 'socket.io-client';

const socket = io('', { path: '/api/chat' });

export class Chat extends Component{
  constructor(props){
    super(props);
    this.state = {
    }

    this.connectionSelectedCallback = this.connectionSelectedCallback.bind(this);
  }

  connectionSelectedCallback(data){
    this.messageList.loadConnection(data);
  }

  render(){
    return(
      <div
          className="modal-chat"
          
          >
          <div style={{padding:"0"}}>
            <Col md={4} style={{padding:"0",background:"white"}}>
            <ConnectionsList connectionSelectedCB={this.connectionSelectedCallback}/>
            </Col>
            <Col md={8} style={{padding:"0",background:"white"}}>
              <MessagesList ref={(msgList)=>{this.messageList = msgList;}} socket={socket}/>
            </Col>
          </div>

        </div>
    );
  }
}
