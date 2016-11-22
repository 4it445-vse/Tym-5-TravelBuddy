import React from 'react';
import { connect } from 'react-redux';


//---Mapping functions and React-redux connection

const mapStateToProps = (state) => {
  return {
    userLoggedIn : state.authentificationReducer.userLoggedIn,
    userData : state.authentificationReducer.userData
  };
}

export function RootPageWrapper(HomePage,LandingPage){
  class RootPage extends React.Component{

    render() {
      if (this.props.userLoggedIn) return <HomePage/>
      else return <LandingPage/>
    }
  }

  return connect(
    mapStateToProps //,
    //mapDispatchToProps
  )(RootPage);

}
