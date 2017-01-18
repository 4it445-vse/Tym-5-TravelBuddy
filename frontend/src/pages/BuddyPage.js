/**
 * Created by James on 17.01.2017.
 */
import React, {Component} from 'react';
import { PageFooter } from '../components/common/PageFooter/PageFooter';
import {BuddyProfile} from '../components/BuddyPage/Profile/BuddyProfile';
import { MainNavigation } from '../components/HomePage/MainNavigation.js';
import api from '../api.js';


export class BuddyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            useritem: null};


        this.getUserDataById.bind(this);
        this.getUserData.bind(this);
        console.log("BuddyPage USERITEM:",this.state.useritem);
}
    componentWillMount() {
        this.getUserData();
        this.getUserDataById(this.props.params.userId);
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
        api.get('/UserMain/'+`${id}`+'?access_token='+localStorage.accessToken, {params: this.paramsForSearchTerm()})
            .then((response) => {
                if (response.status === 200) {
                     console.log('--- getUserDataDetail', response.data);
                    this.setState({useritem: response.data});
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }

    getUserData(){
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


        return (
        <div id="main-wrapper" className="homepage">
            <div className="gradient-wrapper">
                <MainNavigation userData={this.state.userData}/>
                    <div className="container">
                        <BuddyProfile useritem={this.state.useritem}/>
                    </div>
                <PageFooter/>
            </div>
        </div>
        );
    }

}
