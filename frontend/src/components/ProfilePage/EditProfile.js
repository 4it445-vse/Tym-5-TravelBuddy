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
import { DatePicker } from '../common/DatePicker/DatePicker.js';
import { SubmitButton } from '../common/SubmitButton.js';

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: null,
            oldProfilePicture: null,
            country: "",
            countryID: "",
            motto: "",
            bio: "",
            countries: [],
            firstName: "",
            lastName: "",
            birthdate: "",
            email: "",
            phone: "",
            skype: "",
            facebook: "",
            clientErrors: {},
            errors: {},
            countryName: {},
            formSuccess: false,
            refCountryId : "",
            isLoading: false,
            isActive: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.setPicture = this.setPicture.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.loadUserCountry = this.loadUserCountry.bind(this);
        this.loadUserMain();
        this.loadUserDetail();
        this.loadUserCountry();

    }

    componentDidMount() {
        this.setState({
            componentContainer: ReactDOM.findDOMNode(this.refs.componentContainer)
        });
        this.loadCountryEntries();
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
                    if (this.state.isActive === 0 || this.state.isActive === null)
                    {
                      this.setState({isActive: 'Non-active'})
                    }
                    if (this.state.isActive === 1)
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

    setActiveDefaultValue(activeParameter)
    {
      if (activeParameter === 0 || activeParameter === null)
      {
        this.setIsActive('Active');
      }
      else {
        this.setIsActive('Non-active');
      }
    }

    loadUserDetail() {
        const srvUrl = '/UserMain/me/userDetail?access_token=' + localStorage.accessToken;
        api.get(srvUrl).then((response) => {
            if (response.status === 200) {
                var keys = ["phone", "skype", "facebook", "bio", "motto","profilePicture","refCountryId"];
                for (let i = 0; i < keys.length; i++) {
                  if (i ===5)
                  {
                    this.setState({
                        oldProfilePicture: response.data[keys[i]]
                    })
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

    loadUserCountry() {
        const srvUrl = '/Countries/' + this.state.refCountryId;
        api.get(srvUrl).then((response) => {
            if (response.status === 200) {
                var keys = ["id"];
                for (let i = 0; i < keys.length; i++) {
                    this.setState({
                        countryID: response.data[0][keys[i]]
                    })
                }
                  console.log('countdssa',this.state.country);
                  }

        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });

    }

    loadCountryEntries() {
        var countries = null;
        api.get('/Countries').then((response) => {
            if (response.status === 200) {
                countries = response.data;
                console.log('countries',countries);
                this.setState({countries: countries});
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    setIsActive(value) {
      this.setState({isActive: value});
      if (value === 'Non-active')
      {
        value =  '0';
        this.setState({isActive: value});
      }
      if (value === 'Active')
      {
        value = '1';
        this.setState({isActive: value});
      }
      const srvUrl = '/UserMain/me?access_token=' + localStorage.accessToken;
      let formDataActive = this.getFormDataActive();
      api.patch(srvUrl, formDataActive).then(response => {
          console.log('--- edit active passed');
      }).catch((error) => {
          console.log('--- edit active failed');
      });
      if (value === '0')
      {
        value = 'Non-active';
        this.setState({isActive: value});
      }
      if (value === '1')
      {
        value = 'Active';
        this.setState({isActive: value});
      }
    }

    getFormDataActive() {
        return {
            isActive: this.state.isActive
        }
    }

    handleCountryChange(event) {
        this.setState({country: event.target.value});
    }
    //zacatek obrazku

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
        //console.log('priflePictueLog',profilePicture);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log('--- state', this.state);
    }

    createPopover(text) {
        if (!text) {
            return;
        }
        return (
            <Popover id="popover-trigger-focus" title="">
                {text}
            </Popover>
        );
    }

    //konec obrazku

    createField(type, key, desc, values) {

        switch (type) {
            case 'text':
            case 'password':
            case 'email':
                if (!desc) {
                    return (
                      <FormControl
                        type={type}
                        name={key}
                        value={this.state[key]}
                        onChange={this.handleInputChange}
                        />
                    );
                } else {
                    const popover = this.createPopover(desc);
                    return (
                        <OverlayTrigger trigger="focus" placement="right" overlay={popover} delay={100}>
                            <FormControl type={type} value={this.state[key]} name={key} onChange={this.handleInputChange} />
                        </OverlayTrigger>
                    );
                }
            case 'file':
            var addr = '';
            if (this.state.profilePicture || (this.state.profilePicture === null && this.state.oldProfilePicture === null))
            {
              addr = this.state.profilePicture ? this.state.profilePicture : "/images/profilePictureDefault.png";
          }

          else
          {
                addr = "/api/containers/profilePictures/download/"+this.state.oldProfilePicture +"?access_token="+localStorage.accessToken;
          }

                return (
                    <div>
                        <div style={{
                            display: "inline-block"
                        }}>
                            <Image height="250px" width="250px" src={addr} thumbnail/>
                        </div>
                        <div style={{
                            display: "inline-block",
                            margin: "10px"
                        }}>
                            <input type={type} ref="fileInput" style={{
                                display: "none"
                            }} onChange={(e) => this.handlePictureChange(e)} accept="image/*"/>
                            <Button type="submit" onClick={(e) => {
                                e.preventDefault();
                                ReactDOM.findDOMNode(this.refs.fileInput).click();
                            }}>
                                Choose new photo
                            </Button>
                        </div>
                    </div>
                );
            case 'textarea':
                return (<FormControl type={type} name={key} componentClass={type} value={this.state[key]} onChange={this.handleInputChange} />);
            case "select":
                return (
                    <FormControl componentClass="select" placeholder="Select your country" value={this.state.countryID} onChange={this.handleCountryChange}>
                        <option value={this.state[key]}></option>
                        {this.state.countries.map((element) => {
                            return (
                                <option value={element.id} key={element.id}>{element.name}</option>
                            );
                        })}
                    </FormControl>
                );
            case 'date':
                return (<DatePicker type="birthdate" name="birthdate" onChange={this.handleInputChange} ref={(datePicker) => { this.datePicker = datePicker; }}/>);
            case 'radio-active':
            return (
              <ButtonGroup className="block">
                {values.map((value) => {
                  return (
                    <Button
                      key={value}
                      type="button"
                      onClick={this.setIsActive.bind(this, value)}
                      active={this.state.isActive === value}
                    >
                      {value}
                    </Button>
                  );
                })}
              </ButtonGroup>
            );
            default:
                return {};
        }
    }

  /*  setActive(value) {
      const srvUrl = '/UserMain/me?access_token=' + localStorage.accessToken;
      var editActive = '';


      if (this.state.isActive === null || this.state.isActive === 0)
      {
        this.setState({isActive: 1})
      }
      else {
          this.setState({isActive: 0})
      }

      let formDataActive = this.getFormDataActive();
      console.log("getFormDataActive",formDataActive);

      api.patch(srvUrl, formDataActive).then(response => {
          console.log('--- post usermain ok');
          console.log('isActiveOK', value);
      }).catch((error) => {
          console.log('isActiveFail', value);
      });
      console.log('srvUrl',srvUrl);

    }*/



    handleSubmit(event) {
        event.preventDefault();
        let formData = this.getFormData();
        let userMainFailed = false;
        let userDetailFailed = false;
        this.setState({isLoading: true});
        //this.uploadProfilePicture(formData);


        if (formData.isActive === 'Non-active')
        {
          formData.isActive =  '0';
        }
        if (formData.isActive === 'Active')
        {
          formData.isActive =  '1';
        }

        formData.birthdate = this.datePicker.getFormData().selectedDay;
            console.log('--- wizard form data isActive', formData);

        this.uploadProfilePicture(this.state.profilePicture);

        const srvUrl = '/UserMain/me?access_token=' + localStorage.accessToken;
        api.patch(srvUrl, formData).then(response => {
            console.log('--- post usermain ok');
            console.log('birthdateOK', formData.birthdate);
            this.setState({clientErrors: {}});
        }).catch((error) => {
            console.log('<!> updateUserInfo', error);
            console.log('birthdateFAIL', formData.birthdate);
            userMainFailed = true;
            const {response} = error;
            const errors = response.data.error.details.messages;
            this.setState({errors});
            console.log('--- edit usermain failed', this.state.errors);
        });

        const srvUrlUD = '/UserMain/me/userDetail?access_token=' + localStorage.accessToken;
        api.put(srvUrlUD, formData).then(response => {
            console.log('--- post userDetail ok');
            this.setState({clientErrors: {}});
            this.setState({ isLoading: false });
        }).catch((error) => {
            console.log('<!> updateUserDetail', error);
            userDetailFailed = true;
            const {response} = error;
            const errors = response.data.error.details.messages;
            this.setState({errors});
            this.setState({ isLoading: false });
        });

        if (!userMainFailed && !userDetailFailed) {
          this.setState({errors: {}});
        } else {
          this.setState({formSuccess: true});
        }

    }

    getFormData() {
        return {
            country: this.state.country,
            motto: this.state.motto,
            bio: this.state.bio,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            birthdate: this.state.birthdate,
            skype: this.state.skype,
            facebook: this.state.facebook,
            phone: this.state.phone,
            isActive: this.state.isActive
        }
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
        const fields = [
            /*key, label, type, desc, id*/
             [
                'profilePicture', '', 'file', ''
            ],
            [
               'isActive', '', 'radio-active', '', ['Active', 'Non-active']
           ],
            [
                'firstName', 'First name', 'text', ''
            ],
            [
                'lastName', 'Last name', 'text', ''
            ],
            [
                'birthdate', 'Birthdate', 'date', '',
            ],
           [
                 'country', 'Country', 'select', ''
             ],
            [
                'email', 'E-mail', 'email', 'Enter valid email. You will use it for login and password reset'
            ],
            [
                'phone', 'Phone', 'text', ''
            ],
            [
                'skype', 'Skype', 'text', ''
            ],
            [
                'facebook', 'Facebook', 'text', ''
            ],
            [
                'motto', 'Life motto', 'textarea', ''
            ],
            ['bio', 'About Me', 'textarea', '']
        ];
        const {clientErrors} = this.state;
        const {errors} = this.state;
        const { isLoading } = this.state;
        let cssClass = 'form-themed';
        return (
            <div>
                <ProfilePictureEditorComponent container={this.props.modal} ref="pictureEditor" setPicture={this.setPicture}/>
                <div>
                    <form onSubmit={this.handleSubmit} style={{
                        padding: "10px"
                    }}>
                        {fields.map(([key, label, type, desc, values]) => {
                            const clientErrorMsg = clientErrors[key] || [];
                            const errorMsg = errors[key] || [];
                            let isValid = false;
                            if (errorMsg.length || clientErrorMsg.length) {
                                isValid = false;
                            } else {
                                isValid = true;
                            }
                            return (
                                <FormGroup validationState={isValid
                                    ? undefined
                                    : "error"} key={key} controlId={key} className={cssClass}>
                                    <ControlLabel>{label}</ControlLabel>
                                    {this.createField(type, key, desc, values)}
                                    <FormControl.Feedback/>
                                    <HelpBlock>{errorMsg === "can't be blank"
                                            ? "Required!"
                                            : errorMsg}</HelpBlock>
                                </FormGroup>
                            );
                        })}
                      {//<SubmitButton type="submit" bsStyle="primary">Save changes</Button>
                    }
                          <SubmitButton name="Save changes!" bsStyle="primary" isLoading={isLoading}/>
                    </form>
                </div>
            </div>
        );
    }
}
