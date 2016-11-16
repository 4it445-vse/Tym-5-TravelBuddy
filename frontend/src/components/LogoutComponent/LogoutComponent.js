import React, { Component } from 'react';
import { logoutAction } from "../../actions";
import { connect } from 'react-redux';
//import { Button } from 'react-bootstrap';

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
      <p onClick={this.handleClick}>Logout</p>
    );
  }
}

//---Mapping functions and React-redux connection
/*
const mapStateToProps = (state) => {
  return {
  };
}
*/
/*
const mapDispatchToProps = (dispatch) => {
  return {
  };
}
*/
export const LogoutComponentContainer = connect(
  //mapStateToProps //,
  //mapDispatchToProps
)(LogoutComponent);
