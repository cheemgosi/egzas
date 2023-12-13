import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom


const NavbarComponent = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    
    useEffect(() => {
        // Fetch user information when component mounts if the user has a valid cookie
        const fetchUserInfo = async () => {
            try {
                const userInfoResponse = await fetch('http://localhost:3000/user/info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                // console.log(userInfoResponse);

                if (userInfoResponse.ok) {
                    const userInfo = await userInfoResponse.json();
                    // Handle user information as needed
                    console.log('User Information:', userInfo);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };
        fetchUserInfo();
    }
    )

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/logout', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                // Clear any local user data or perform additional actions upon successful logout
                console.log('User logged out successfully.');
                navigate('/login');

            } else {
                console.error('Logout failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="" className='fs-4'>Pavadinimas</Navbar.Brand>
                    <button type="button" className="btn btn-danger max-80 font-medium" onClick={handleLogout}>
                        Atsijungti
                    </button>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;
