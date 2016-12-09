import React, { Component } from 'react';
import { logoutAction } from "../../actions";
import { connect } from 'react-redux';

export class LogoutComponent extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    //event.preventDefault();
    this.props.dispatch(logoutAction());
  }

  render(){
    return(
      <a onClick={this.handleClick}><i className="fa fa-sign-out"></i>&nbsp;Logout</a>
    );
  }
}

//---Mapping functions and React-redux connection

export const LogoutComponentContainer = connect()(LogoutComponent);
