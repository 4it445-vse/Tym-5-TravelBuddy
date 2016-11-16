import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem, Button } from 'react-bootstrap';
import {LogoutComponentContainer} from '../../LogoutComponent/LogoutComponent.js'

export class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.props.locat

    }


    render() {
        const menuItems = [
            ["/", "Search"],
            ["profile", "Profile"],
        ];
        return (
        <Navbar fixedTop>

            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Travel Buddy</a>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse >
                <Nav pullRight>
                    {menuItems.map(([link, title], index) => (
                      <LinkContainer to={link}>
                         {/*   <Button>{title}</Button>*/}
                        <NavItem eventKey={link} >
                            {title}
                        </NavItem>
                      </LinkContainer>
                    ))}
                    <NavItem>
                    <LogoutComponentContainer />
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}
