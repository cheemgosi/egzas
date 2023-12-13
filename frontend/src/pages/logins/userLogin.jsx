import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
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

                if (userInfoResponse.ok) {
                    const userInfo = await userInfoResponse.json();
                    // Handle user information as needed
                    console.log('User Information:', userInfo);
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                setMessage(data.message);
                
                // On successful login, fetch user information and redirect
                const userInfoResponse = await fetch('http://localhost:3000/info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (userInfoResponse.ok) {
                    const userInfo = await userInfoResponse.json();
                    // Handle user information as needed
                    console.log('User Information:', userInfo);
                }

                // Redirect to "/"
                navigate('/');
            } else {
                setMessage('Login successful.');
                navigate('/'); // Redirect to "/" if login was successful (no JSON data in response)
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('There was an error with the login. Please try again.');
        }
    };

    return (
        <div className='container-xl bg-secondary text-center pt-5'>
            <form onSubmit={handleFormSubmit} className='text-center p-5'>
                <p className='fs-2'>Prisijungti</p>
                <div>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        placeholder='E-paštas'
                        className='my-2'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='password'
                        id='pass'
                        name='password'
                        placeholder='Slaptažodis'
                        className='my-2'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input type='submit' value='Submit' />
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UserLogin;
