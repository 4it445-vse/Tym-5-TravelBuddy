import React, { Component } from 'react';


export class LoginComponent extends Component{
  render(){
    return(
//test
      <form className="form-inline">
          <input id="loginEmail" className="form-control" type="email" autoComplete="off" placeholder="e-mail"></input>
          <input id="loginPass" className="form-control" type="password" autoComplete="off" placeholder="password"></input>
        <button type="submit" className="btn btn-default">Login</button>
      </form>

    );
  }
}
