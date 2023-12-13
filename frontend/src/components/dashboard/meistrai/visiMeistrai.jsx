import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateSpecialistModal from './modalRedaguotiMeistra';

const VisiMeistrai = () => {
    const [specialists, setSpecialists] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedSpecialistId, setSelectedSpecialistId] = useState(null);
  
    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:3000/specialists/${id}`, {
            method: 'DELETE',
            credentials:"include"
          });
    
          if (response.ok) {
            // Specialist deleted successfully
            console.log('Specialist deleted successfully');
            // Handle further actions if needed after successful deletion
          } else if (response.status === 404) {
            // Specialist not found
            setError('Specialist not found');
          } else {
            // Other error scenarios
            setError('Failed to delete specialist');
          }
        } catch (err) {
          // Handle network errors or exceptions
          setError('An error occurred while deleting the specialist.');
        }
      };
  
  const openModal = (id) => {
    setSelectedSpecialistId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

    const [editableFields, setEditableFields] = useState({
        firstName: false,
        lastName: false,
        specialization: false,
        photo: false,
        service: false,
        city: false,
    });

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

    const handleEditClick = (index) => {
        const updatedEditableFields = { ...editableFields };
        Object.keys(updatedEditableFields).forEach((key) => {
            updatedEditableFields[key] = false;
        });
        updatedEditableFields[index] = true;
        setEditableFields(updatedEditableFields);
    };
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
            {error ? (
              <div className="col-lg-12">
                Error: {error}
              </div>
            ) : (
              specialists.map((specialist) => (
                <div className="row" key={specialist.id}>
                  <div className="row col-lg-12 border-bottom border-dark py-2">
                    <div className="row col-lg-10 ">
                      <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                        {specialist.firstName}
                      </div>
                      <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                        {specialist.lastName}
                      </div>
                      <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                        {specialist.specialization}
                      </div>
                      <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                        <img src={`http://localhost:3000/${specialist.photo}`} alt="" />
                        {console.log(specialist.photo)}
                      </div>
                      <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                        {specialist.service}
                      </div>
                      <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                        {specialist.city}
                      </div>
                    </div>
                    <div className="col-lg-2"> 
                      <div className="col-lg-1 opposite py-2" >
                        <i className="bi bi-pencil text-warning dark-on-hover" onClick={() => openModal(specialist._id)}></i>
                        <i class="bi bi-x-lg text-danger dark-on-hover fs-3 mx-2" onClick={() => handleDelete(specialist._id)}></i>

                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
    
          {showModal && selectedSpecialistId && (
            <UpdateSpecialistModal
              id={selectedSpecialistId} 
              onClose={closeModal}
            />
          )}
        </div>
      );
    };
    
    export default VisiMeistrai;
