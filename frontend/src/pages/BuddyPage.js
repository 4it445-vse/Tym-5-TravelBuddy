/**
 * Created by James on 17.01.2017.
 */
import React, {Component} from 'react';
import {PageFooter} from '../components/common/PageFooter/PageFooter';
import {MainNavigation} from '../components/HomePage/MainNavigation.js';
import api from '../api.js';
import {Grid, Row, Col, Panel,Label} from 'react-bootstrap';

export class BuddyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        };

    }


    componentWillUpdate() {

    }

    componentWillMount() {
        this.getUserDataById(this.props.params.userId);
    }

    componentDidMount() {

    }

    paramsForSearchTerm() {
        return {
            filter: {
                include: {relation: "userDetail"},
            },
            limit: 1000
        }
    }

    getUserDataById(id) {
        api.get('/UserMain/'+`${id}` +'/?access_token=' + localStorage.accessToken,{params: this.paramsForSearchTerm()})
            .then((response) => {
                    console.log('--- getUserDataDetail',response.data);
                    this.setState({useritem: response.data});
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }



    render() {

        console.log("Render UserItem", this.state.useritem);
        if (this.state.useritem) {
            let birthdate = new Date(this.state.useritem.birthdate).toLocaleDateString();
            let ownerPictureUrl = "/api/containers/profilePictures/download/"+this.state.useritem.userDetail.profilePicture;
            let ownerStyle = {
                backgroundImage: "url(" + ownerPictureUrl + ")",
            }

            console.log("Picture URL", ownerPictureUrl);
        return (

            <div id="main-wrapper" className="buddy-page">
                <section>
                    <MainNavigation/>
                    <div className="container">

                        <div className="h1 text-center">Buddy Detail</div>
                        <Panel>
                        <div className="buddy-picture" style={ownerStyle}></div>
                        <Grid bsClass="buddy-profile">
                            <Row className="show-grid">
                                <Col xs={12} sm={4} md={4} lg={4}><Label>Name:</Label></Col>
                                <Col xs={12} sm={8} md={8} lg={8}>{this.state.useritem.firstName} {this.state.useritem.lastName}</Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={12} sm={4} md={4} lg={4}><Label>Birthdate:</Label></Col>
                                <Col xs={12} sm={8} md={8} lg={8}>{birthdate}</Col>
                            </Row>
                            <Row className="show-grid">
                                <Col xs={12} sm={4} md={4} lg={4}><Label>Bio:</Label></Col>
                                <Col xs={12} sm={8} md={8} lg={8}>{this.state.useritem.userDetail.bio}</Col>
                            </Row>
                            <Row className="show-grid">
                                <Col xs={12} sm={4} md={4} lg={4}><Label>Motto:</Label></Col>
                                <Col xs={12} sm={8} md={8} lg={8}>{this.state.useritem.userDetail.motto}</Col>
                            </Row>
                        </Grid>

                        <div className="container">
                            <div className="h3 text-center">User ratings</div>

                        </div>
                        </Panel>
                    </div>
                </section>
                <PageFooter/>
            </div>
        );
    } else {

                return (
                  <div className="h3 text-center">
                      <Label className="danger">No records have been found!</Label>
                  </div>
                );

        }


    }
}
