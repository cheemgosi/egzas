import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const VisiMeistrai = () => {
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
        <div className='container-xl bg-secondary'>
            <div className="row py-3">
                <div className="col-lg-10 text-center fs-4 text-light">
                    Visi meistrai
                </div>
                <div className="col-lg-2 text-center fs-4">
                    <Link to="/admin/meistrai/naujas">
                        <i className="bi bi-plus-circle dark-on-hover text-light"></i>
                    </Link>
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
                            <th>Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr>
                                <td colSpan="7">Error: {error}</td>
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
                                    <td>
                                        <div className="col-lg-1 opposite py-2 ">
                                            <i className="bi bi-x-lg text-danger dark-on-hover"></i>
                                            <i className="bi bi-pencil text-warning dark-on-hover"></i>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default VisiMeistrai;
