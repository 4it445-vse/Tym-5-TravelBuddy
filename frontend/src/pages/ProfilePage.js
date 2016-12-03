import React, { Component } from 'react';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { PageFooter} from '../components/common/PageFooter/PageFooter';
import { EditProfile} from '../components/ProfilePage/EditProfile';
import {ProfilePictureEditorComponent} from "../components/ProfilePictureEditor/ProfilePictureEditorComponent.js";


export class ProfilePage extends Component {

  render() {
    return (
      <div id="main-wrapper" className="profile-page">
        <PageHeader/>
        {/* profile info */}
        <section>
          <div className="container">
            <div className="col-lg-4">
              {/* placeholder */}
              <img src="http://www.howtowriteacv.guru/wp-content/uploads/2016/02/cv-icon-3.png"/>
              <ProfilePictureEditorComponent/>
            </div>
            <div className="col-lg-8">
              <EditProfile/>
            </div>

          </div>
        </section>
        {/* products */}
        <section>

        </section>
        {/* comments */}
        <PageFooter/>
      </div>
    );
  }
}
