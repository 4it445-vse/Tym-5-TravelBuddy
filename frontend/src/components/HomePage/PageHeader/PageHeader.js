import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem, Button } from 'react-bootstrap';


export class PageHeader extends Component {
    render() {
        const menuItems = [
            ["/", "Search"],
            ["/profile", "Profile"],
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

            <Navbar.Collapse pullRight>
                <Nav>
                    {menuItems.map(([link, title], index) => (
                      <LinkContainer to={link}>
                         {/*   <Button>{title}</Button>*/}
                        <NavItem key={index} eventKey={index} >
                            {title}
                        </NavItem>
                      </LinkContainer>
                    ))}
                </Nav>

            </Navbar.Collapse>
    </div>
        </Navbar>
        );
    }
}


