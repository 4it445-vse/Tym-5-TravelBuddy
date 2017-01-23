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
    Panel
} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import api from '../../api.js';
import { DatePicker } from '../common/DatePicker/DatePicker.js';
import { SubmitButton } from '../common/SubmitButton.js';
import Select from 'react-select';

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: null,
            oldProfilePicture: null,
            isActive: false,
            country: undefined,
            countryID: "",
            motto: undefined,
            bio: undefined,
            countries: [],
            firstName: undefined,
            lastName: undefined,
            birthdate: undefined,
            email: undefined,
            phone: undefined,
            skype: undefined,
            facebook: undefined,
            languages: [],
            selectedLanguages: null,

            clientErrors: {},
            errors: {},
            countryName: {},
            formSuccess: false,
            refCountryId : "",
            isLoading: false,
            expandSettings: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.setPicture = this.setPicture.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.loadUserCountry = this.loadUserCountry.bind(this);
        this.loadUserMain();
        this.loadUserDetail();


    }

    componentDidMount() {
        this.setState({
            componentContainer: ReactDOM.findDOMNode(this.refs.componentContainer)
        });
        this.loadCountryEntries();
        this.loadLanguageEntries();
    }

    loadLanguageEntries(){
        var languages = null;
        api.get('/Languages?access_token=' + localStorage.accessToken)
            .then((response) => {
                // console.log("Product languages:",response.data);
                if (response.status === 200){
                    languages = response.data;
                    const transformedlanguages = languages.map((language)=>{
                        return {value:language.id, label:language.name};
                    });
                    this.setState({languages:transformedlanguages});
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                console.log("Error: ", error.response);
            });
    }

    loadUserMain() {
        const srvUrl = '/UserMain/me?access_token=' + localStorage.accessToken;
        api.get(srvUrl, {params: {filter: {include: "languages"}}}).then((response) => {
            if (response.status === 200) {
                let languages = response.data.languages;
                let transformedLanguages = languages.map((language)=>{
                    return {value:language.id, label:language.name};
                });
                this.setState({ selectedLanguages: transformedLanguages });
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

            }
        }).catch((error) => {
            console.log("Error: ", error);
            console.log("Error: ", error.response);
        });
    }

    setActiveDefaultValue(activeParameter)
    {
      if (activeParameter)
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

    loadUserCountry(refCountry) {
        const srvUrl = '/Countries/' + refCountry + '?access_token=' + localStorage.accessToken;
        api.get(srvUrl).then((response) => {
            if (response.status === 200) {
                var keys = ["id"];
                for (let i = 0; i < keys.length; i++) {
                    this.setState({
                        country: response.data[keys[i]]
                    })
                }
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
        value =  false;
        this.setState({isActive: value});
      }
      if (value === 'Active')
      {
        value = true;
        this.setState({isActive: value});
      }
      // //Funkcionalita odstraanen to vyeseni problemu 11.12.2016 JSA
      // const srvUrl = '/UserMain/me?access_token=' + localStorage.accessToken;
      // let formDataActive = this.getFormDataActive();
      // api.patch(srvUrl, formDataActive).then(response => {
      //     console.log('--- edit active passed');
      // }).catch((error) => {
      //     console.log('--- edit active failed');
      // });
      if (value === false)
      {
        value = 'Non-active';
        this.setState({isActive: value});
      }
      if (value === true)
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
            console.log("aborted");
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

        switch (type) {
            case 'text':
            case 'password':
            case 'email':
                if (!desc) {
                    return (
                      <FormControl
                        type={type}
                        name={key}
                        value={this.state[key] ? this.state[key] : undefined}
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
            case 'textarea':
                return (<FormControl type={type} name={key} componentClass={type} value={this.state[key]} onChange={this.handleInputChange} />);
            case "select":
                return (
                    <FormControl componentClass="select" placeholder="Select your country" value={this.state.country} onChange={this.handleCountryChange}>
                        <option value=""></option>
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

    handleSubmit(event) {
        event.preventDefault();
        let formData = this.getFormData();
        let userMainFailed = false;
        let userDetailFailed = false;
        this.setState({isLoading: true});

        if (formData.isActive === 'Non-active')
        {
          formData.isActive = false;
        }
        if (formData.isActive === 'Active')
        {
          formData.isActive = true;
        }

        formData.birthdate = this.datePicker.getFormData().selectedDay;

        this.uploadProfilePicture(this.state.profilePicture);
        const srvUrl = '/UserMain/me?access_token=' + localStorage.accessToken;
        api.patch(srvUrl, formData).then(response => {
            this.setState({clientErrors: {}});
        }).catch((error) => {
            console.log('<!> patch UserMain', error);
            userMainFailed = true;
            const {response} = error;
            const errors = response.data.error.details.messages;
            this.setState({errors});
        });

        const srvUrlUD = '/UserMain/me/userDetail?access_token=' + localStorage.accessToken;
        api.put(srvUrlUD, formData).then(response => {
            this.setState({clientErrors: {}});
            this.setState({ isLoading: false });
        }).catch((error) => {
            console.log('<!> put UserDetail', error);
            userDetailFailed = true;
            const {response} = error;
            const errors = response.data.error.details.messages;
            this.setState({errors});
            this.setState({ isLoading: false });
        });

        // TODO
        // this.saveSelectedLanguages(this.state.selectedLanguages);

        if (!userMainFailed && !userDetailFailed) {
          this.setState({errors: {}});
        } else {
          this.setState({formSuccess: true});
        }

    }

    saveSelectedLanguages(languages) {
      if (languages){
        const transformedLanguages = languages.map((language)=>{
          return {
            //"refUserId": "3",
            "refLanguageId": language.value
          }
        });
        let srv = '/UserLanguages?access_token=' + localStorage.accessToken;
        let data = this.state.selectedLanguages;
        api.put(srv, data).then(response => {
          //TODO update or create user's languages
          // console.log('--- UserLanguages', response);
        }).catch((error) => {
          console.log('--- UserLanguages', error);
        });
      } else {
        console.log('--- saveSelectedLanguages empty languages');
      }
    }

    getFormData() {
        return {
            refCountryId: this.state.country,
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
        const visibleFields = [
            /*key, label, type, desc, id*/
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
            ]
        ];
        const fields = [
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
          [
              'bio', 'About Me', 'textarea', ''
          ]
        ];
        const { clientErrors } = this.state;
        const { errors } = this.state;
        const { isLoading } = this.state;
        let cssClass = 'form-themed';
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="edit-profile-form" style={{
                    padding: "10px"
                }}>
                    <Panel>
                      {visibleFields.map(([key, label, type, desc, values]) => {
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
                                {label ? <ControlLabel>{label}</ControlLabel> : undefined}
                                {this.createField(type, key, desc, values)}
                                <FormControl.Feedback/>
                                <HelpBlock>{errorMsg === "can't be blank"
                                        ? "Required!"
                                        : errorMsg}</HelpBlock>
                            </FormGroup>
                        );
                      })}

                      <Button style={{marginRight: "15px"}} type="button" className="btn btn-primary" onClick={ ()=> this.setState({ expandSettings: !this.state.expandSettings })}>
                        Show more settings&nbsp;
                        {this.state.expandSettings ? <i className="fa fa-chevron-up" aria-hidden="true"></i> : <i className="fa fa-chevron-down" aria-hidden="true"></i>}
                      </Button>
                      {!this.state.expandSettings ? <SubmitButton name="Save changes" bsStyle="primary" isLoading={isLoading}/> : undefined}
                      <Panel collapsible expanded={this.state.expandSettings}>
                        <FormGroup className="form-themedx form-group" controlId="inputLanguages" key="inputLanguages" bsClass="" validationState={(true) ? null:"error"}>
                          <ControlLabel>Languages</ControlLabel>
                          <Select
                              name="selectLanguages"
                              value={this.state.selectedLanguages}
                              onChange={(selected)=>{this.setState({selectedLanguages:selected});}}
                              multi={true}
                              options={this.state.languages}
                              placeholder="Languages"
                          />
                        </FormGroup>
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
                                  {label ? <ControlLabel>{label}</ControlLabel> : undefined}
                                  {this.createField(type, key, desc, values)}
                                  <FormControl.Feedback/>
                                  <HelpBlock>{errorMsg === "can't be blank"
                                          ? "Required!"
                                          : errorMsg}</HelpBlock>
                              </FormGroup>
                          );
                        })}
                        {this.state.expandSettings ? <SubmitButton name="Save changes" bsStyle="primary" isLoading={isLoading}/> : undefined}
                      </Panel>
                    </Panel>
                </form>
            </div>
        );
    }
}
