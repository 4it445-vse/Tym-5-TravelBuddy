import React, { Component } from 'react';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { PageFooter} from '../components/common/PageFooter/PageFooter';
import { EditProfile} from '../components/ProfilePage/EditProfile';
import {ProfilePictureEditorComponent} from "../components/ProfilePictureEditor/ProfilePictureEditorComponent.js";
import { Tabs, Tab, Row, Col } from "react-bootstrap";

export class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state={
      tabKey: 1
    }

    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  handleTabSelect(key) {
    this.setState({tabKey:key});
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
          <Row>
            <Col xs={12}>
            <Tabs  activeKey={this.state.tabKey} onSelect={this.handleTabSelect} id="controlled-tab">
              <Tab  eventKey={1} title="My Offers">Tab 1 content</Tab>
              <Tab  eventKey={2} title="User Reviews">Tab 2 content</Tab>
              <Tab  eventKey={3} title="Messages">Tab 3 content</Tab>
            </Tabs>
            </Col>
          </Row>
      </div>
      <PageFooter/>
      </div>
    );
  }
}
