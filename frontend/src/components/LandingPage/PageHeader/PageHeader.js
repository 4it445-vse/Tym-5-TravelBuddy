import React, { Component } from 'react';
import { LoginComponentContainer } from '../LoginComponent/LoginComponent';
import { Nav, Navbar, NavItem } from 'react-bootstrap';


export class PageHeader extends Component {
    render() {
        const menuItems = [
            ["#at-home", "Home"],
            ["#at-platform", "Platform"],
            ["/registration", "Register"],
        ];
        return (
        <Navbar fixedTop>

            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Travel Buddy</a>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <div className="width-fix">

            <Navbar.Collapse>
                <Nav>
                    {menuItems.map(([link, title], index) => (
                        <NavItem key={index} eventKey={index} href={link}>
                            {title}
                        </NavItem>
                    ))}
                </Nav>
                <Nav bsClass="login-centered">
                    <LoginComponentContainer/>
               </Nav>
            </Navbar.Collapse>
    </div>
        </Navbar>
        );
    }
}
