import React, { useState } from 'react';
import DashNavbar from '../dashNavbar';

const NaujasMeistras = () => {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        vardas: '',
        pavarde: '',
        specializacija: '',
        servisas: '',
        miestas: ''
    });

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataWithImage = new FormData();
        formDataWithImage.append('image', image);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formDataWithImage,
                credentials:"include"
            });

            const data = await response.json();
            const { name } = data;

            const specialistData = {
                firstName: formData.vardas,
                lastName: formData.pavarde,
                specialization: formData.specializacija,
                photo: `/public/images/${name}.png`,
                service: formData.servisas,
                city: formData.miestas
            };

            const specialistResponse = await fetch(`http://localhost:3000/specialists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(specialistData),
                credentials:"include"
            });

            // response not handled

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <DashNavbar />
            <div className='container-xl bg-secondary'>
                <form onSubmit={handleSubmit} className='text-center p-5'>
                    <p className='fs-2'>Pridėti naują meistrą</p>
                    <div>
                        <input type="text" name="vardas" placeholder='Vardas' className='my-2' required onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="text" name="pavarde" placeholder='Pavardė' className='my-2' required onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="text" name="specializacija" placeholder='Specializacija' className='my-2' required onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="text" name="servisas" placeholder='Servisas' className='my-2' required onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="text" name="miestas" placeholder='Miestas' className='my-2' required onChange={handleInputChange} />
                    </div>
                    <p>Nuotrauka</p>
                    <input type="file" name="image" accept="image/*" required onChange={handleImageChange} />
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NaujasMeistras;