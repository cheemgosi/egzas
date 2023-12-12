import React, { useState } from 'react';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            setMessage(data.message); // Assuming the API response contains a 'message' field
            // You can handle the success or error message as needed
        } catch (error) {
            console.error('Error:', error);
            setMessage('There was an error with the login. Please try again.'); // Generic error message
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
