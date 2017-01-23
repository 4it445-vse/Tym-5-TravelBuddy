import React, { Component } from 'react';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { PageFooter} from '../components/common/PageFooter/PageFooter';
import { EditProfile} from '../components/ProfilePage/EditProfile';
import { EditProfilePicture } from '../components/ProfilePage/EditProfilePicture.js';
import { ProductList} from '../components/ProfilePage/ProductList.js';
import { ProfilePictureEditorComponent } from "../components/ProfilePictureEditor/ProfilePictureEditorComponent.js";
import { Panel, Tabs, Tab } from "react-bootstrap";
import { MyRequestsList } from '../components/ProfilePage/MyRequestsList.js';
import api from '../api.js';
import { Chat } from "../components/ChatComponent/Chat.js"

export class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state={
      tabKey: 1,
      userData: {},
    }

    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  handleTabSelect(key) {
    this.setState({tabKey:key});
  }

  getUserData() {
    api.get('UserMain/me?access_token=' + localStorage.accessToken)
      .then((response) => {
          // console.log('--- getUserData', response.data);
          this.setState({ userData: response.data });
          this.setState({ fullName: response.data.firstName + ' ' + response.data.lastName});
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  componentDidMount() {
    //TODO retrieve users data, possible refactoring, getting data here and sending to EditProfile
    this.getUserData();
    // console.log('---- EditProfile data', this._editProfile.getFormData());
  }

  render() {

    return (
      <div id="main-wrapper" className="profile-page">
        <PageHeader/>
        {/* Profile info */}
        <section>
          <div className="container">
              <div className="col-md-3">
                <ProfilePictureEditorComponent/>
                <EditProfilePicture ref={(component) => { this._editProfilePicture = component; }}/>
                <h2>{this.state.fullName}</h2>
              </div>
              <div className="col-md-9">
                <Tabs  activeKey={this.state.tabKey} onSelect={this.handleTabSelect} id="controlled-tab">
                  <Tab eventKey={1} title="My Offers">
                    <div className="my-offers tab-list">
                      <Panel><ProductList/></Panel>
                    </div>
                  </Tab>
                  <Tab eventKey={2} title="My Requests">
                    <div className="my-requests tab-list">
                      <Panel><MyRequestsList/></Panel>
                    </div>

                  </Tab>
				          <Tab eventKey={3} title="Connections"><Chat/></Tab>
                  <Tab eventKey={4} title="Settings">
                    <div className="settings">
                      <Panel><EditProfile ref={(component) => { this._editProfile = component; }}/></Panel>
                    </div>
                  </Tab>
                </Tabs>
              </div>
          </div>
        </section>
        <PageFooter/>
      </div>
    );
  }
}
