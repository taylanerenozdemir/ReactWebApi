import React, { Component } from 'react';
import { NavLink } from 'react-router';
import { Navbar, Nav, Container } from 'react-bootstrap';


export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" data-bs-theme="dark">
                <Container>
                    <Navbar.Toggle aria-controls="main-navbar-nav" />
                    <Navbar.Collapse id="main-navbar-nav">
                        <Nav className="mx-auto">
                            <NavLink className='d-inline p-2 bg-dark text-white' style={{textDecoration:'none'}} to="/">Home</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white' style={{textDecoration:'none'}} to="/employees">Employees</NavLink>
                            <NavLink className='d-inline p-2 bg-dark text-white' style={{textDecoration:'none'}} to="/departments">Departments</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
