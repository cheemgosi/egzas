import React, { useState, useEffect } from 'react';
import Navbar from './navbar';

const Main = () => {
    const [specialists, setSpecialists] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpecialists = async () => {
            try {
                const response = await fetch('http://localhost:3000/specialists');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json(); 
                setSpecialists(data);
            } catch (error) {
                setError('Error fetching data');
            }
        };

        fetchSpecialists();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container-xl bg-secondary">
                <div className="row spread text-white fs-2">
                    <div className="col-lg-5"><p className='text-center'>Meistrai</p></div>
                    <div className="col-lg-5 py-2">    
                        <form className="form-inline d-flex">
                            <input className="form-control mr-sm-2" type="search" placeholder="Paieška" aria-label="Search"/>
                            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Paieška</button>
                        </form>                    
                    </div>
                </div>
                <div className='row fs-4 border-top border-dark'>
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Vardas</th>
                                <th>Pavardė</th>
                                <th>Specializacija</th>
                                <th>Nuotrauka</th>
                                <th>Servisas</th>
                                <th>Miestas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td colSpan="6">Error: {error}</td>
                                </tr>
                            ) : (
                                specialists.map((specialist) => (
                                    <tr key={specialist.id}>
                                        <td>{specialist.firstName}</td>
                                        <td>{specialist.lastName}</td>
                                        <td>{specialist.specialization}</td>
                                        <td>{specialist.photo}</td>
                                        <td>{specialist.service}</td>
                                        <td>{specialist.city}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Main;
