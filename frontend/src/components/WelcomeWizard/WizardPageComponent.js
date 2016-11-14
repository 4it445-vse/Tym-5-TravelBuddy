import React, { Component } from 'react';

export class WizardPageComponent extends Component {

  render() {

      return(
        <div style={{ margin:"auto"}}>
          <div style={{background:"#2fa4e7", color:"white", width:"100%",padding: "10px", textAlign:"center"}}>
            <h2 style={{color:"white"}}>
              Thank you for joining Travel Buddy!
            </h2>
          </div>
          <div style={{padding: "10%"}}>
            <p>
            Within Travel Buddy platform you can both search & request for services offered by buddies around the world and even become a buddy by offering your own service!
            </p>
          </div>
        </div>
      );
  }
}
