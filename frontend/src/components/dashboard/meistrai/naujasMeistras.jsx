import React, { useState } from 'react';
import DashNavbar from '../dashNavbar';

const NaujasMeistras = () => {
    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [service, setService] = useState('');
    const [city, setCity] = useState('');
    const [formError, setFormError] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || !firstName || !lastName || !specialization || !service || !city) {
            setFormError('Please fill in all fields.');
            return;
        }

        try {
            // Code for image upload remains the same

            const specialistData = {
                firstName,
                lastName,
                specialization,
                photo: `/public/images/${name}`,
                service,
                city,
            };

            const specialistResponse = await fetch(`http://localhost:3000/specialists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(specialistData),
            });

            if (!specialistResponse.ok) {
                throw new Error('Failed to add new specialist.');
            }

            const specialist = await specialistResponse.json();
            console.log('New specialist added:', specialist);

            // Clear form and error state after successful submission
            setFirstName('');
            setLastName('');
            setSpecialization('');
            setService('');
            setCity('');
            setImage(null);
            setFormError('');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <DashNavbar />
            <div className='container-xl bg-secondary'>
                <form onSubmit={handleSubmit} className='text-center p-5'>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' className='my-2' required />
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' className='my-2' required />
                    <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder='Specialization' className='my-2' required />
                    <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} required />
                    <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder='Service' className='my-2' required />
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' className='my-2' required />
                    <input type="submit" value="Submit" />
                    {formError && <p>{formError}</p>}
                </form>
            </div>
        </div>
    );
};

export default NaujasMeistras;
