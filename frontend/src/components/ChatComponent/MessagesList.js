import React, { Component } from 'react';
import  ReactChatView  from "react-chatview";
import { MessageItem } from "./MessageItem.js";
import api from '../../api.js';
import Textarea from 'react-textarea-autosize';

import Promise from 'bluebird';
import lodash from "lodash";


export class MessagesList extends Component{
  constructor(props){
    super(props);
    this.state = {
      elements: [],
      connectionData: null,

      inputHeight:30
    }

    this.buildElements = this.buildElements.bind(this);
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.fetchMessageData = this.fetchMessageData.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.elementInfiniteLoad = this.elementInfiniteLoad.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('new inc message', (msg) =>{
      var newElements = [(<MessageItem key={msg.id} message={msg} currentUser={localStorage.userId}/>)].concat(this.state.elements);
      this.setState({elements:newElements});
    });
  }

  loadConnection(data){
    if (this.state.connectionData)
    {
      this.props.socket.emit("leave channel",this.state.connectionData.id);
    }
    this.props.socket.emit("join channel", data.id);
    this.setState({connectionData: data, elements:[]});
    this.fetchMessageData(20,0,data.id);
  }

  fetchMessageData(limit,offset, connectionId){
    var params = {
      params:{
        filter:{
          limit: limit,
          skip: offset,
          order: "id DESC"
        }
      }
    };

    api.get("/connections/"+connectionId+"/messages?access_token="+localStorage.accessToken, params)
    .then((response) =>{
      if (response.status === 200){
        let messages = response.data;
        var elements = this.state.elements.concat(this.buildElements(messages));
        this.setState({
            elements: elements
        });
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      console.log("Error: ", error.response);
    });
  }

  handleInfiniteLoad() {
    return new Promise((resolve, reject) => {
      if (this.state.connectionData){

        var debounced = lodash.debounce(()=>{
            var params = {
              params:{
                filter:{
                  limit: 20,
                  skip: this.state.elements.length,
                  order: "id DESC"
                }
              }
            };

            api.get("/connections/"+this.state.connectionData.id+"/messages?access_token="+localStorage.accessToken, params)
            .then((response) =>{
              if (response.status === 200){
                let messages = response.data;
                var elements = this.state.elements.concat(this.buildElements(messages));
                this.setState({
                    elements: elements
                });
                resolve();
              }
            })
            .catch((error) => {
              console.log("Error: ", error);
              console.log("Error: ", error.response);
              reject(error);
            });

        },1000);

        debounced();

      }else{
        reject();
      }
    });
  }

  buildElements(data) {
      var elements = [];
      for (var i = 0; i <  data.length; i++) {
          elements.push(<MessageItem key={data[i].id}  message={data[i]} currentUser={localStorage.userId}/>)
      }
      return elements;
  }

  elementInfiniteLoad() {
    return(
      <div style={{ width:"100%",textAlign:"center",zIndex:"1000"}}>
        <div style={{borderRadius:"8px",padding:"8px",display:"inline-block"}}>
          <i className="fa fa-spinner fa-pulse fa-fw fa-lg"/>
        </div>
      </div>
    );
  }

    onKeyDown (e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage(e.target.value);
        e.target.value="";
      }
    }

    sendMessage(msg){
      var trimmedMsg = msg.trim();
      if (trimmedMsg.length > 0){
        var dataToSend ={
          text:trimmedMsg,
          fromUserId:localStorage.userId
        }

        api.post("/connections/"+this.state.connectionData.id+"/messages?access_token="+localStorage.accessToken, dataToSend)
        .then((response) =>{
          if (response.status === 200){
            //emit the message via socket.io
            var toUser = null;
            if (this.state.connectionData.user1.id.toString() === localStorage.userId) toUser = this.state.connectionData.user2.id;
            else toUser = this.state.connectionData.user1.id;
            this.props.socket.emit("new message",{...response.data, toUserId:toUser});

            //and insert into elements
            var newElements = [(<MessageItem key={response.data.id}  message={response.data} currentUser={localStorage.userId}/>)].concat(this.state.elements);
            this.setState({elements:newElements});

            this.props.messageSentCB(response.data);

          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          console.log("Error: ", error.response);
        });
      }
    }

  render(){
    if (this.state.connectionData){
      return(
        <div style={{height:this.props.height}}>
        <div style={{height:(this.props.height - this.state.inputHeight)}}>
        <ReactChatView
                className="chatList"
                 flipped={true}
                 onInfiniteLoad={this.handleInfiniteLoad}
                 scrollLoadThreshold={0}
                 loadingSpinnerDelegate={this.elementInfiniteLoad()}
                 >
                 {this.state.elements}
        </ReactChatView>
        </div>
        <div >
        <Textarea
          style={{width:"100%", resize:"none", outline:"none", border: 0, boxSizing: 'border-box', height:"20px", bottom:"0px", position:"absolute", padding:"5px",borderTop:"solid 1px #e5e5e5"}}
          maxRows={5}
          placeholder="Write a message..."
          onKeyDown={this.onKeyDown}
          onHeightChange={(height) => {this.setState({inputHeight:(height)})}}
        />
        </div>
        </div>
      );
    }else {
      return(
        <div style={{display: "flex", height:this.props.height,justifyContent:"center", alignContent:"center", flexDirection:"column"}}>
          <div style={{textAlign:"center",fontWeight:"100",fontSize:"x-large",color:"lightgray"}}>Select a connection to display messages.</div>
        </div>
      );
    }
  }
}
