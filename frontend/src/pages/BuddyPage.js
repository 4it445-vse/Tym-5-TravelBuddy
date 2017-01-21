/**
 * Created by James on 17.01.2017.
 */
import React, {Component} from 'react';
import {PageFooter} from '../components/common/PageFooter/PageFooter';
import {MainNavigation} from '../components/HomePage/MainNavigation.js';
import api from '../api.js';
import {Grid, Row, Col} from 'react-bootstrap';

export class BuddyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useritem: '',

            userData: null
        };


        this.getUserDataById = this.getUserDataById.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.getUserData();
        this.getUserDataById(props.params.userId);
        console.log("BuddyPage USERITEM:", this.state.useritem);
    }


    paramsForSearchTerm() {
        return {
            filter: {
                include: {relation: "userDetail"},
                //{relation: "userDetail"}
            },
            limit: 1000
        }
    }

    getUserDataById(id) {
        api.get('/UserMain/' + `${id}` + '?access_token=' + localStorage.accessToken, {params: this.paramsForSearchTerm()})
            .then((response) => {
                if (response.status === 200) {
                    var filtered = response.data;
                    console.log('--- getUserDataDetail', filtered);
                    this.setState({useritem: filtered});
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }


    getUserData() {
        api.get('UserMain/me?access_token=' + localStorage.accessToken)
            .then((response) => {
                if (response.status === 200) {
                    console.log('--- getUserData', response.data);
                    this.setState({userData: response.data});
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });

    }


    render() {

        console.log("State",this.state.useritem);
        return (
            <div id="main-wrapper" className="buddy-page">
                <section>
                    <MainNavigation userData={this.state.userData}/>
                    <div className="container">
                        <div className="h1"></div>
                        <br/>
                        <h1 className="text-center">Buddy Detail</h1>
                        <Grid bsClass="buddy-profile">

                            <Row className="show-grid">
                                <Col xs={4} md={4} lg={4}>Name:</Col>
                                <Col xs={8} md={8} lg={8}>{this.state.useritem.firstName != null ? this.state.useritem.firstName : "Unknown" } {this.state.useritem.lastName != null ? this.state.useritem.lastName : "Unknown" }</Col>
                            </Row>
                            <Row className="show-grid">
                                <Col xs={4} md={4} lg={4}>Birthdate:</Col>
                                <Col xs={8} md={8} lg={8}>{this.state.useritem.las/Col>
                            </Row>
                            <Row className="show-grid">
                                <Col xs={4} md={4} lg={4}>Bio:</Col>
                                <Col xs={8} md={8} lg={8}></Col>
                            </Row>
                            <Row className="show-grid">
                                <Col xs={4} md={4} lg={4}>Bio:</Col>
                                <Col xs={8} md={8} lg={8}></Col>
                            </Row>
                        </Grid>
                        <div className="container">
                            <div className="h3">User Rating</div>
                            <div>Rating 1.6</div>
                        </div>
                    </div>
                </section>
                <PageFooter/>
            </div>
        );
    }

}
