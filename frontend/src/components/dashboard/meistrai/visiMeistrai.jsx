import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateSpecialistModal from './modalRedaguotiMeistra';

const VisiMeistrai = () => {
    const [specialists, setSpecialists] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedSpecialistId, setSelectedSpecialistId] = useState(null);
  
  
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
                        {specialist.photo}
                      </div>
                      <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                        {specialist.service}
                      </div>
                      <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                        {specialist.city}
                      </div>
                    </div>
                    <div className="col-lg-2"> 
                      <div className="col-lg-1 opposite py-2" onClick={() => openModal(specialist._id)}>
                        {/* Button to open modal */}
                        <i className="bi bi-pencil text-warning dark-on-hover" ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
    
          {/* Render the modal based on the state */}
          {showModal && selectedSpecialistId && (
            <UpdateSpecialistModal
              id={selectedSpecialistId} // Pass the specialist ID to the modal
              onClose={closeModal} // Pass the function to close the modal
            />
          )}
        </div>
      );
    };
    
    export default VisiMeistrai;
