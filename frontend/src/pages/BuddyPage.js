/**
 * Created by James on 17.01.2017.
 */
import React, {Component} from 'react';
import { PageFooter } from '../components/common/PageFooter/PageFooter';
import { MainNavigation } from '../components/HomePage/MainNavigation.js';
import api from '../api.js';


export class BuddyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {userData: null};
}


    componentDidMount() {
        this.getUserData();
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

    render() {
        const { userData } = this.state;
        return (
        <div id="main-wrapper" className="homepage">
            <div className="gradient-wrapper">
                <MainNavigation userData={userData}/>
                    <div className="container">

                    </div>
                <PageFooter/>
            </div>
        </div>
        );
    }

}