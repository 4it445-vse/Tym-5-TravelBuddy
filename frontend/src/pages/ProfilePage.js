import React, { Component } from 'react';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { PageFooter} from '../components/common/PageFooter/PageFooter';
import { EditProfile} from '../components/ProfilePage/EditProfile';
import { ProductList} from '../components/ProfilePage/ProductList.js';
import { ProfilePictureEditorComponent } from "../components/ProfilePictureEditor/ProfilePictureEditorComponent.js";
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

  componentDidMount() {
    //TODO retrieve users data, possible refactoring, getting data here and sending to EditProfile
    console.log('---- EditProfile data', this._editProfile.getFormData());
  }

  render() {
    return (
      <div id="main-wrapper" className="profile-page">
        <PageHeader/>
        {/* Profile info */}
        <section>
          <div className="container">
              <div className="col-lg-3">
                <Row>
                  {/* placeholer */}
                  <img src="http://www.howtowriteacv.guru/wp-content/uploads/2016/02/cv-icon-3.png"/>
                  <ProfilePictureEditorComponent/>
                </Row>
                <Row>
                  <EditProfile ref={(component) => { this._editProfile = component; }}/>
                </Row>
              </div>
              <Col lg={9}>
                <Tabs  activeKey={this.state.tabKey} onSelect={this.handleTabSelect} id="controlled-tab">
                  <Tab  eventKey={1} title="My Offers"><ProductList/></Tab>
                  <Tab  eventKey={2} title="User Reviews">Tab 2 content</Tab>
                  <Tab  eventKey={3} title="Messages">Tab 3 content</Tab>
                </Tabs>
              </Col>
          </div>
        </section>
        <PageFooter/>
      </div>
    );
  }
}
