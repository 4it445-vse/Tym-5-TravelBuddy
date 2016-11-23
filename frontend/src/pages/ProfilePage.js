import React, { Component } from 'react';
import { PageHeader } from '../components/HomePage/PageHeader/PageHeader';
import { PageFooter} from '../components/common/PageFooter/PageFooter';

export class ProfilePage extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div>
      <PageHeader/>
      <div className="jumbotron">
          <h1>Profile page</h1>
      </div>
      <div className="ident-top marginBottom">
          <div className="h3"> Welcome to your profile page.</div>
          <div>

          </div>
      </div>
      <PageFooter/>
      </div>
    );
  }
}
