import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const navbar = () => {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" >
            <Container>
                <Navbar.Brand href="" className='fs-4'>Pavadinimas</Navbar.Brand>
                    <button type="button" class="btn btn-danger max-80 font-medium">Atsijungti</button>
            </Container>
            </Navbar>
        </div>
    );
};

export default navbar;