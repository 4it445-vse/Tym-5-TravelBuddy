import React, { Component } from 'react';
import  Infinite from "react-infinite";

import { ConnectionItem } from "./ConnectionItem.js";

import api from '../../api.js';
import lodash from "lodash";


export class ConnectionsList extends Component{
  constructor(props){
    super(props);
    this.state = {
      elements: [],
      elementsWithNotification: new Set(),
      isInfiniteLoading: false,
      activeElementId:null
    }

    this.fetchData = this.fetchData.bind(this);
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.elementClicked = this.elementClicked.bind(this);
  }

  pushConnectionToTop(connectionId, isNotification){
    const connectionIndex = this.state.elements.findIndex((element,index,array)=>{
      if (element.id === connectionId) return true;
      return false;
    });

    if (connectionIndex >= 0){
       this.state.elements.splice(0, 0, this.state.elements.splice(connectionIndex, 1)[0]);
       //this.forceUpdate();
    }else{
      this.fetchSingleConnection(connectionId,(connection)=>{
      this.state.elements.push(connection);
      //this.forceUpdate();
      });
    }

    console.log("conid,activeElementId",connectionId,this.state.activeElementId);
    if (isNotification && (connectionId !== this.state.activeElementId)){
      this.state.elementsWithNotification.add(connectionId);
    }
    this.forceUpdate();
  }

  fetchSingleConnection(connectionId,cb){
    var params = {
      params:{
        filter:{
          order: "lastMessageDate DESC",
          include:[{
            relation: "user1",
            scope:{
              include: {
                relation: "userDetail"
              }
            }
          },
          {
            relation: "user2",
            scope:{
              include: {
                relation: "userDetail"
              }
            }
          }]
        }
      }
    };

    api.get("/connections/"+connectionId+"?access_token="+localStorage.accessToken, params)
    .then((response) =>{
      console.log(response);
      if (response.status === 200){
        //console.log("data",response.data);
        cb(response.data);
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      console.log("Error: ", error.response);
    });
  }

  fetchData(limit,offset){
    this.setState({
        isInfiniteLoading: true,
    });

    var params = {
      params:{
        filter:{
          limit: limit,
          skip: offset,
          order: "lastMessageDate DESC"
        }
      }
    };

    api.get("/usermain/me/connectionsList?access_token="+localStorage.accessToken, params)
    .then((response) =>{
      // console.log(response);
      if (response.status === 200){
         console.log("data",response.data);
        let connections = response.data;
        this.setState({
            isInfiniteLoading: false,
            elements: this.state.elements.concat(connections)
        });
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      console.log("Error: ", error.response);
    });
  }

  elementClicked(data,elementId){
    this.setState({activeElementId:elementId});
    this.props.connectionSelectedCB(data);
    this.state.elementsWithNotification.delete(elementId);
    this.forceUpdate();
  }


  elementInfiniteLoad() {
      return(
        <div style={{ width:"100%",textAlign:"center"}}>
          <div style={{borderRadius:"8px",padding:"8px",display:"inline-block"}}>
            <i className="fa fa-spinner fa-pulse fa-fw fa-lg"/>
          </div>
        </div>
      );
    }

  handleInfiniteLoad(){
      var debounced = lodash.debounce(()=>{
        this.fetchData(6,this.state.elements.length);
      },1000);
      debounced();
    }

  render(){
    return(
      <Infinite elementHeight={90}
               containerHeight={this.props.height}
               infiniteLoadBeginEdgeOffset={0}
               onInfiniteLoad={this.handleInfiniteLoad}
               loadingSpinnerDelegate={this.elementInfiniteLoad()}
               isInfiniteLoading={this.state.isInfiniteLoading}
               ref="infinite"
               >
               {
                 this.state.elements.map((e,index)=>{
                 return(
                   <ConnectionItem key={e.id} index={index} data={e} currentUser={localStorage.userId} handleElementClick={this.elementClicked} active={this.state.activeElementId === e.id}
                      hasNotification={this.state.elementsWithNotification.has(e.id)}/>
                  );
               })}
      </Infinite>
    );
  }
}
