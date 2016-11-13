import React, { Component } from 'react';
import { LoginComponent } from '../LoginComponent/LoginComponent';
import { Nav, Navbar, NavItem } from 'react-bootstrap';


export class PageHeader extends Component {
    render() {
        const menuItems = [
            ["", ""],
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

            </Navbar.Collapse>
    </div>
        </Navbar>
        );
    }
}


