import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const dashNavbar = () => {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" >
            <Container>
                <Navbar.Brand href="/admin/servisai" className='fs-4'>Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto spread">
                    <Nav.Link href="/admin/servisai" className='fs-5'>Servisai</Nav.Link>
                    <Nav.Link href="/admin/meistrai" className='fs-5'>Meistrai</Nav.Link>
                    </Nav>
                    <button type="button" class="btn btn-danger max-80 font-medium">Atsijungti</button>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
      );
    };

export default dashNavbar;