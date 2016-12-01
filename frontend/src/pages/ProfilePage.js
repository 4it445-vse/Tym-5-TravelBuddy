import React, { Component } from 'react';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { PageFooter} from '../components/common/PageFooter/PageFooter';
import { EditProfile} from '../components/ProfilePage/EditProfile';
import {ProfilePictureEditorComponent} from "../components/ProfilePictureEditor/ProfilePictureEditorComponent.js";


export class ProfilePage extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div id="main-wrapper" className="profile-page">
      <PageHeader/>
      <div className="jumbotron">
          <h1>Profile page</h1>
      </div>
      <div className="ident-top marginBottom">
          <div className="h3"> Welcome to your profile page.</div>
          <div>
          <EditProfile/>
          </div>
      </div>
      <PageFooter/>
      </div>
    );
  }
}
