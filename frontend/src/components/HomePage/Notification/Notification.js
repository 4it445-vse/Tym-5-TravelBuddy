/**
 * Created by James on 23.01.2017.
 */
import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Label, Button, Panel, OverlayTrigger, Popover} from 'react-bootstrap';
import api from '../../../api.js';
import ReactDOM from 'react-dom';

export class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            placement: 'bottom',
            open: props.show,
        };

        this.getNotifications(localStorage.userId);

    }


    getNotifications(id) {
        api.get('/Notifications?access_token=' + localStorage.accessToken, {params: this.paramsForSearchTerm(id)})
            .then((response) => {
                if (response.status === 200) {
                    let notifications = response.data;
                    const filterNotifications = notifications.filter(function (notification) {
                        return notification.refRecipientUserId == localStorage.userId && notification.isRead != true;
                    });
                    console.log("Filtered Notifications", filterNotifications);
                    this.setState({notifications: filterNotifications});
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                console.log("Error: ", error.response);
            });
    }


    setNotification(notificationId) {
        api.patch('/Notifications/' + `${notificationId}` + '?access_token=' + localStorage.accessToken, {isRead: true})
            .then((response) => {

                console.log("Patch Notifications", response.data);
                this.getNotifications(localStorage.userId);
            })
            .catch((error) => {
                console.log("Error: ", error);
                console.log("Error: ", error.response);
            });
    }


    paramsForSearchTerm(searchTerm) {
        if (!searchTerm) return {};
        else {
            return {
                filter: {
                    where: {
                        refRecipientUserId: {
                            like: "%" + searchTerm + "%"
                        }
                    },
                    limit: 25
                }
            };
        }
    }

    renderList() {
        return this.state.notifications.map((notification) => {
            return (
                <ListGroupItem key={notification.id} onClick={() => this.setNotification(notification.id)}>
                    <Label>New</Label>{notification.message}
                </ListGroupItem>
            );
        });
    }



    render() {
        if (this.state.notifications.length != 0) {
            const popoverBottom = (
                <Popover id="popover-positioned-bottom">
                    <ListGroup>
                        {this.renderList()}
                    </ListGroup>
                </Popover>
            );

            return (

                    <div className="notification-element">
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom}>
                            <Button onClick={ () => this.setState({open :!this.state.open})} >
                                <i className="fa fa-bell"></i> Notifications
                            </Button>
                        </OverlayTrigger>
                    </div>

            );
        } else {
            const noPopoverBottom = (
                <Popover id="popover-positioned-bottom">
                    <ListGroup>
                        <ListGroupItem>No new notifications!</ListGroupItem>
                    </ListGroup>
                </Popover>
            );
            return (
                <div className="notification-element">
                    <OverlayTrigger trigger="click" placement="bottom" overlay={noPopoverBottom}>
                        <Button onClick={ () => this.setState({open :!this.state.open})}>
                            <i className="fa fa-bell"></i> Notifications
                        </Button>
                    </OverlayTrigger>
                </div>
            );
        }
    }


}