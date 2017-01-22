/**
 * Created by James on 22.01.2017.
 */
import api from '../../../api';
import React, { Component } from 'react';
import {Notifications, NotificationItem} from 'pui-react-notifications';
export class NotificationView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications : null,
        };

        this.getNotifications();

    }

    getNotifications(id) {
        api.get('/Notifications?access_token='+localStorage.accessToken, {params: this.paramsForSearchTerm(id)})
            .then((response) =>{
                if (response.status === 200){
                    let notifications = response.data;
                    const filterNotifications = notifications.filter(function (notification) {
                        return notification.refRecipientUserId = localStorage.userId;
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
                <NotificationItem key={notification.id}
                    onClick={() => this.setNotification(notification.id)}>
                    <Flag image={<h3 className="mvn"><Label>New</Label></h3>}>
                        <p className="type-sm type-neutral-5 mvn"> {notification.message}</p>
                    </Flag>


                </NotificationItem>
            );
        });
    }

    render() {



        return(
            <div className="notification-view">
                <Notifications size="h2">
                    {this.renderList()}
                </Notifications>
            </div>
        );

    }
}