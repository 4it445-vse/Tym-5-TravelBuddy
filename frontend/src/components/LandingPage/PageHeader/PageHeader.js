import React, { Component } from 'react';
import { LoginComponent } from '../LoginComponent/LoginComponent';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export class PageHeader extends Component {
    render() {
        const menuItems = [
            ["#at-home", "Home"],
            ["#at-about", "Platform"],
            ["#at-register", "Register"],
        ];
        return (
        <Navbar fixedTop>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Travel Buddy</a>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    {menuItems.map(([link, title], index) => (
                        <NavItem key={index} eventKey={index} href={link}>
                            {title}
                        </NavItem>
                    ))}
                </Nav>
                <Nav pullRight>
                    <LoginComponent/>
               </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}


