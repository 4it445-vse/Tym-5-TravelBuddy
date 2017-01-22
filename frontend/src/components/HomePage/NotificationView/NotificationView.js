/**
 * Created by James on 22.01.2017.
 */
import api from '../../../api';
import React, { Component } from 'react';
import {Notifications, NotificationItem} from 'pui-react-notifications';
import {Label} from 'react-bootstrap';




export class NotificationView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications : null,
        };

        this.getNotifications(localStorage.userId);

    }

    getNotifications(id) {
        api.get('/Notifications?access_token='+localStorage.accessToken, {params: this.paramsForSearchTerm(id)})
            .then((response) =>{
                if (response.status === 200){
                    let notifications = response.data;
                    const filterNotifications = notifications.filter(function (notification) {
                        return notification.refRecipientUserId == localStorage.userId;
                    });
                    console.log("Filtered Notifications",filterNotifications);
                   this.setState({notifications: filterNotifications});
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                console.log("Error: ", error.response);
            });
    }

    setNotification(notificationId) {

    }

    paramsForSearchTerm(searchTerm){
        if (!searchTerm) return {};
        else{
            return {
                filter:{
                    where:{
                        refRecipientUserId:{
                            like: "%"+searchTerm+"%"
                        }
                    },
                    limit: 10
                }
            };
        }
    }

    renderList(){
        return this.state.notifications.map((notification) => {
            return (
                <NotificationItem key={notification.id}>
                    <div className="h4"><Label>New</Label>
                        <p className="notification-message"> {notification.message}</p></div>
                </NotificationItem>
            );
        });
    }

    render() {



        return(
            <div className="notification-view">
                <Notifications size="h1">
                    <NotificationItem>Item 1</NotificationItem>
                </Notifications>
            </div>
        );

    }
}
