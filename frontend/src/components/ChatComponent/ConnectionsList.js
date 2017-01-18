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
      isInfiniteLoading: false,
      activeElement:null
    }

    this.buildElements = this.buildElements.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.elementClicked = this.elementClicked.bind(this);
  }

  componentDidMount(){
    this.fetchData(6,0);
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
          order: "id DESC"
        }
      }
    };

    api.get("/usermain/me/connectionsList?access_token="+localStorage.accessToken, params)
    .then((response) =>{
      // console.log(response);
      if (response.status === 200){
        // console.log("data",response.data);
        let connections = response.data;
        this.setState({
            isInfiniteLoading: false,
            elements: this.buildElements(connections)
        });
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      console.log("Error: ", error.response);
    });
  }

  elementClicked(data,index){
    // console.log("element clicked",this.state.elements[index]);

    //if (this.state.activeElement) this.refs.infinite.props.children[this.state.activeElement].setActive(false);
    //this.state.elements[index].setState({active:true});
    this.setState({activeElement:index});

    this.props.connectionSelectedCB(data);
  }

    buildElements(data) {
        var elements = [];
        for (var i = 0; i < data.length; i++) {
            elements.push(<ConnectionItem key={i} index={i} data={data[i]} handleElementClick={this.elementClicked}/>)
        }
        return elements;
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
               containerHeight={500}
               infiniteLoadBeginEdgeOffset={0}
               onInfiniteLoad={this.handleInfiniteLoad}
               loadingSpinnerDelegate={this.elementInfiniteLoad()}
               isInfiniteLoading={this.state.isInfiniteLoading}
               ref="infinite"
               >
               {this.state.elements.map((e)=>{
                 return(
                   <ConnectionItem key={e.props.index} index={e.props.index} data={e.props.data} handleElementClick={e.props.handleElementClick} active={this.state.activeElement === e.props.index}/>
                  );
               })}
      </Infinite>
    );
  }
}
