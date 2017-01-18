import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    OverlayTrigger,
    Popover,
    ButtonGroup,
    Button,
    Image
} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { ProfilePictureEditorComponent } from "../ProfilePictureEditor/ProfilePictureEditorComponent.js";
import api from '../../api.js';

export class EditProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: null,
            oldProfilePicture: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.setPicture = this.setPicture.bind(this);
        this.loadUserMain();
        this.loadUserDetail();


    }

    componentDidMount() {
        this.setState({
            componentContainer: ReactDOM.findDOMNode(this.refs.componentContainer)
        });
    }

    loadUserMain() {
        const srvUrl = '/UserMain/me?access_token=' + localStorage.accessToken;
        api.get(srvUrl).then((response) => {
            if (response.status === 200) {
                var keys = ["lastName", "firstName", "birthdate", "email","isActive"];
                for (let i = 0; i < keys.length; i++) {
                  if ( i===2)
                  {
                    var dt = new Date(response.data[keys[i]]);
                    var dtDate = dt.getDate();
                    var dtMonth = dt.getMonth()+1;
                    var dtYear = dt.getFullYear();
                    if (dtDate < 10)
                    {
                      dtDate = '0'+dtDate;
                    }
                    if (dtMonth< 10)
                    {
                      dtMonth = '0'+dtMonth;
                    }
                   var dtDatum =   dtMonth+ '/' + dtDate  +  '/' +dtYear;
                    this.setState({
                        [keys[i]]: dtDatum
                    })
                      this.datePicker.setDefaultValue(this.state.birthdate);
                      this.setActiveDefaultValue(this.state.isActive);
                  }
                  else if (i===4)
                  {
                      this.setState({
                        [keys[i]]: response.data[keys[i]]
                    })
                    if (this.state.isActive === false || this.state.isActive == null)
                    {
                      this.setState({isActive: 'Non-active'})
                    }
                    if (this.state.isActive === true)
                    {
                      this.setState({isActive: 'Active'})
                    }
                  }
                  else {
                    this.setState({
                        [keys[i]]: response.data[keys[i]]
                    })
                  }
                }

                  console.log("birthdate",response.data);
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    loadUserDetail() {
        const srvUrl = '/UserMain/me/userDetail?access_token=' + localStorage.accessToken;
        api.get(srvUrl).then((response) => {
            if (response.status === 200) {
                var keys = ["phone", "skype", "facebook", "bio", "motto","profilePicture","refCountryId"];
                for (let i = 0; i < keys.length; i++) {
                  if (i === 5)
                  {
                    this.setState({
                        oldProfilePicture: response.data[keys[i]]
                    })
                  }
                  else if (i === 6)
                  {
                    this.loadUserCountry(response.data[keys[i]]);
                  }
                  else
                  {
                    this.setState({
                        [keys[i]]: response.data[keys[i]]
                    })
                  }
              }
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    handlePictureChange(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        event.target.value = '';
        reader.onloadend = () => {
            this.refs.pictureEditor.show();
            this.refs.pictureEditor.setPicture(reader.result);
        }
        reader.onabort = () => {
            console.log("aborted-.");
        }
        reader.onerror = () => {
            console.log("error");
        }
        reader.readAsDataURL(file);
    }

    setPicture(pictureBLOB, profilePicture) {
      this.setState({pictureBLOB: pictureBLOB, profilePicture: profilePicture});
      this.handleSubmit(profilePicture);
    }

    handleSubmit(data) {
        // event.preventDefault();
        this.uploadProfilePicture(data);

    }

    uploadProfilePicture(data){
      if(data){

        var blob = this.dataURLtoBlob(data);
        var formData = new FormData();
        var fileName = "profilePicture.jpg";
        formData.append("imageFile",blob, fileName);

        console.log('--- profilePicture');
         api.post('/containers/profilePictures/upload?access_token=' + localStorage.accessToken, formData)
           .then((data)=>{
             console.log('--- upload successful', data);
           })
           .catch((error) => {
             console.log('<!> upload Failed', error);
           });

      }
    }

    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    }


    render() {
        var addr = '';
        if (this.state.profilePicture || (this.state.profilePicture === null && this.state.oldProfilePicture === null)) {
          addr = this.state.profilePicture ? this.state.profilePicture : "/images/profilePictureDefault.png";
        } else {
          addr = "/api/containers/profilePictures/download/"+this.state.oldProfilePicture +"?access_token="+localStorage.accessToken;
        }
        return (
            <div>
              <ProfilePictureEditorComponent container={this.props.modal} ref="pictureEditor" setPicture={this.setPicture} handleSubmit={this.handleSubmit}/>
              <form onSubmit={this.handleSubmit} className="edit-profile-form">
                <div className="choose-picture">
                    <Image src={addr} thumbnail/>
                    <Button className="choose-picture-btn" type="submit" onClick={(e) => {
                        e.preventDefault();
                        ReactDOM.findDOMNode(this.refs.fileInput).click();
                    }}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Button>
                </div>
                <div>
                    <input type="file" ref="fileInput" style={{display: "none"}} onChange={(e) => this.handlePictureChange(e)} accept="image/*"/>
                </div>
              </form>
            </div>
        );
    }
}
