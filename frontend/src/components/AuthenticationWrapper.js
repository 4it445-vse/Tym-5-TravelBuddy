import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


//---Mapping functions and React-redux connection

const mapStateToProps = (state) => {
  //console.log("store changed in Auth", state);
  return {
    userLoggedIn : state.authentificationReducer.userLoggedIn,
    userData : state.authentificationReducer.userData
  };
}

/*
const mapDispatchToProps = (dispatch) => {
  return {

  };
}
*/

export function AuthenticationWrapper(Component){
  class AuthenticationComponent extends React.Component{

    componentWillMount(){
      //console.log("Authenticated component will mount");
      //console.log("this.props.store", this.props.store);
      //console.log(this.props.userData);
      //console.log(this.props.userLoggedIn);
      if (!this.props.userLoggedIn){
        //user isnt logged in ! we have to redirect to landing page
        browserHistory.push('/');
        return;
      }else {
        return;
        //we can normaly render
      }
    }

    render() {
      return <Component {...this.props} {...this.state}/>
    }
  }


  return connect(
    mapStateToProps //,
    //mapDispatchToProps
  )(AuthenticationComponent);

  //return  AuthenticationComponent;
}
