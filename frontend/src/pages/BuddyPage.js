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
        this.state = {userData: null,
        userDetail:null};
}


    componentDidMount() {
        this.getUserData();
        this.getUserDataById(this.props.params.userId);
        console.log("URL USER ID:",this.props.params.userId);
    }

    getUserData(){
        api.get('UserMain/me?access_token=' + localStorage.accessToken)
            .then((response) => {
                console.log('--- getUserData', response.data);
                this.setState({ userData: response.data });
            })
            .catch((error) => {
                console.log("Error: ", error);
            });

    }

    paramsForSearchTerm() {
        return {
            filter: {
                include: 'userMain'
            },
            limit: 1000
        };
    }
//, {params: this.paramsForSearchTerm()}
    getUserDataById(id) {
        api.get('/UserDetail/'+id+'?access_token=' + localStorage.accessToken)
            .then((response) => {
                console.log('--- getUserDataDetail', response.data);
                this.setState({ userDetail: response.data });
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }
    render() {
        const { userData } = this.state;
        const { userDetail } = this.state;
        return (
        <div id="main-wrapper" className="homepage">
            <div className="gradient-wrapper">
                <MainNavigation userData={userData}/>
                    <div className="container">
                        <BuddyProfile user={userDetail}/>
                    </div>
                <PageFooter/>
            </div>
        </div>
        );
    }

}
