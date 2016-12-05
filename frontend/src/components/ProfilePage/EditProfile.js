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
    Alert,
    Checkbox,
    Image
} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { ProfilePictureEditorComponent } from "../ProfilePictureEditor/ProfilePictureEditorComponent.js";
import api from '../../api.js';
import { DatePicker } from '../common/DatePicker/DatePicker.js';
import moment from 'moment';
import { Link } from 'react-router';

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //  pictureBLOB: null, // so far this is always null!
            //  profilePicture: null,
            country: "",
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
            formSuccess: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        //vypnuto pro potreby ladeni validace
        //  this.handlePictureChange = this.handlePictureChange.bind(this);
        //    this.setPicture = this.setPicture.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.loadUserMain();
        this.loadUserDetail();
        //this.loadUserCountry();
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
                var keys = ["lastName", "firstName", "birthdate", "email"];
                for (let i = 0; i < keys.length; i++) {
                    this.setState({
                        [keys[i]]: response.data[keys[i]]
                    })
                }
                console.log(response);
                this.setState({birthdate: '10/10/2016'});
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
                var keys = ["phone", "skype", "facebook", "bio", "motto"];
                for (let i = 0; i < keys.length; i++) {
                    this.setState({
                        [keys[i]]: response.data[keys[i]]
                    })
                }
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    loadUserCountry() {
        const srvUrl = '/UserMain/me/userDetail/';
        const refCountryId = null;
        api.get(srvUrl).then((response) => {
            if (response.status === 200) {
                var keys = ["refCountryId"];
                for (let i = 0; i < keys.length; i++) {
                    this.setState({
                        [keys[i]]: response.data[keys[i]]
                    })
                }
                  console.log('country', this.state.refCountryId);
                  const refCountryId = this.state.refCountryId;
                      console.log('countryxconst', refCountryId);
                          const srvCountry = '/Countries/' + refCountryId;
                      api.get(srvCountry)
                      .then((response) => {
                        if (response.status === 200) {
                            var keys = ["name"];
                            for (let i = 0; i < keys.length; i++) {
                                this.setState({
                                    [keys[i]]: response.data[keys[i]]

                                })
                                  console.log("name",name);
                                this.setState({country:name});
                            }
                        }
                    }).catch((error) => {
                        console.log("Error: ", error);
                        console.log("Error: ", error.response);
                    });
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });

    }

    loadCountryEntries() {
        var countries = null;
        api.get('/Countries').then((response) => {
            //console.log(response.data);
            //console.log(response.status);
            if (response.status === 200) {
                countries = response.data;
                this.setState({countries: countries});
            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    handleCountryChange(event) {
        this.setState({country: event.target.value});
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

    createField(type, key, desc, values) {
        let cssClass = "form-themed";
        switch (type) {
            case 'text':
            case 'password':
            case 'email':
                if (!desc) {
                    return (
                      <FormControl
                        className={cssClass}
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
                            <FormControl className={cssClass} type={type} value={this.state[key]} name={key} onChange={this.handleInputChange} />
                        </OverlayTrigger>
                    );
                }
            case 'file':
                return (
                    <div>
                        <div style={{
                            display: "inline-block"
                        }}>
                            <Image height="100px" width="100px" src={this.state.profilePicture
                                ? this.state.profilePicture
                                : "/images/profilePictureDefault.png"} thumbnail/>
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
                                Choose photo
                            </Button>
                        </div>
                    </div>
                );

            case 'textarea':
                return (<FormControl className={cssClass} type={type} name={key} componentClass={type} value={this.state[key]} onChange={this.handleInputChange} />);
            case "select":
                return (
                    <FormControl className={cssClass} componentClass="select" placeholder="Select your country" value={this.state.country} onChange={this.handleCountryChange}>
                        <option value={this.state[key]}></option>
                        {this.state.countries.map((element) => {
                            return (
                                <option value={element.id} key={element.id}>{element.name}</option>
                            );
                        })}
                    </FormControl>
                );
            case 'date':
                return (<DatePicker type="birthdate" name="birthdate" onChange={this.handleInputChange}/>);
            default:
                return {};
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let errors = {};
        let formData = this.getFormData();
        let userMainFailed = false;
        let userDetailFailed = false;
        //console.log('--- wizard form data', this.getFormData());
      //  var data = this.getFormData();
        //console.log('--- profilePicture', data.profilePicture);


        const srvUrl = '/UserMain/me?access_token=' + localStorage.accessToken;
        api.patch(srvUrl, formData).then(response => {
            console.log('--- post usermain ok');
            this.setState({clientErrors: {}});
        }).catch((error) => {
            console.log('<!> updateUserInfo', error);
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
        }).catch((error) => {
            console.log('<!> updateUserDetail', error);
            userDetailFailed = true;
            const {response} = error;
            const errors = response.data.error.details.messages;
            this.setState({errors});
        });

        if (!userMainFailed && !userDetailFailed) {
          this.setState({errors: {}});
        } else {
          this.setState({formSuccess: true});
        }

    }

    getFormData() {
        return {
            //  profilePicture: this.state.profilePicture,
            // country: this.state.country, //id in table Countries
            motto: this.state.motto,
            bio: this.state.bio,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            birthdate: this.state.birthdate,
            skype: this.state.skype,
            facebook: this.state.facebook,
            phone: this.state.phone
        }
    }

    render() {
        const fields = [
            /*key, label, type, desc, id*/
            /*  [
                'profilePicture', 'Profile picture', 'file', ''
            ],*/
            [
                'firstName', 'First name', 'text', ''
            ],
            [
                'lastName', 'Last name', 'text', ''
            ],
            // [
            //     'birthdate', 'Birthdate', 'date', '', this.state.birthdate
            // ],
            // [
            //     'country', 'Country', 'select', ''
            // ],
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
                                    : "error"} key={key} controlId={key}>
                                    <ControlLabel>{label}</ControlLabel>
                                    {this.createField(type, key, desc, values)}
                                    <FormControl.Feedback/>
                                    <HelpBlock>{errorMsg === "can't be blank"
                                            ? "Required!"
                                            : errorMsg}</HelpBlock>
                                </FormGroup>
                            );
                        })}
                        <Button type="submit" bsStyle="primary">Save changes</Button>
                    </form>
                </div>
            </div>
        );
    }
}
